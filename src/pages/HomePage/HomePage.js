import './HomePage.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Line, Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
    Chart.defaults.color = "#000";
    const { user, getAccessTokenSilently } = useAuth0();
    const [ weightData, setWeightData ] = useState();
    const [ freqData, setFreqData ] = useState();
    const [ exerciseNames, setExerciseNames ] = useState();
    const [ selectedName1, setSelectedName1 ] = useState();
    const [ selectedName2, setSelectedName2 ] = useState();
    const [ newUser, setNewUser ] = useState(true);

    // options for graph
    const options = {
        responsive: true,
        spanGaps: true,
        scales: {
            x: {
                ticks: {
                    color: ['black']
                }
            },
            y: {
                ticks: {
                    color: ['black']
                }
            }
        }
    };

    useEffect(() => {
        getWorkoutData();
    }, [user, selectedName1, selectedName2]);

    async function getWorkoutData() {
        try {
            const token = await getAccessTokenSilently();
            console.log(user)
            const response = await axios.get(`http://localhost:8080/exerciseLog/?user=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            if (newUser && response.data.length !== 0) {
                setNewUser(false);
            }
            getWeightData(response.data);
            getFreqData(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const getWeightData = (data) => {
        let plottedExercise1;
        let plottedExercise2;

        // default the selected exercise to be the one that appears the most in user's logs
        if (!selectedName1 && !selectedName2) {
            const workouts = data.map(workout => workout.exerciseName);
            const workoutCount = {};
            workouts.forEach(workout => {
                if (!workoutCount[workout]) {
                    workoutCount[workout] = 1;
                } else {
                    workoutCount[workout] += 1;
                }
            });
            setExerciseNames(Object.keys(workoutCount));
            const max = Math.max(...Object.values(workoutCount));
            plottedExercise1 = Object.keys(workoutCount).find(key => workoutCount[key] === max);
            setSelectedName1(plottedExercise1);
            delete workoutCount[plottedExercise1];
            const secondMax = Math.max(...Object.values(workoutCount));
            plottedExercise2 = Object.keys(workoutCount).find(key => workoutCount[key] === secondMax);
            setSelectedName2(plottedExercise2);
        } else {
            plottedExercise1 = selectedName1;
            plottedExercise2 = selectedName2;
        }
        // console.log(mainWorkout);
        let filteredData1 = data.filter(workout => workout.exerciseName === plottedExercise1).sort((a, b) => new Date(a.date) - new Date(b.date));
        let filteredData2 = data.filter(workout => workout.exerciseName === plottedExercise2).sort((a, b) =>new Date(a.date) - new Date(b.date));

        // combine dates for both datasets and sort 
        let dates = filteredData1.map(workout => workout.date).concat(filteredData2.map(workout => workout.date));
        dates = [...new Set(dates.sort())];
        // supplement datasets with empty points to line up with dates
        dates.forEach((date, index) => {
            if(!filteredData1[index] || filteredData1[index].date !== date) {
                filteredData1 = [...filteredData1.slice(0,index), {date: date, weight: null}, ...filteredData1.slice(index)];
            }
            if(!filteredData2[index] || filteredData2[index].date !== date) {
                filteredData2 = [...filteredData2.slice(0,index), {date: date, weight: null}, ...filteredData2.slice(index)];
            }
        })

        setWeightData({
            labels: dates,
            datasets: [{
                label: plottedExercise1,
                data: filteredData1.map(workout => workout.weight),
                borderColor: 'rgb(25, 69, 170)',
                backgroundColor: 'rgba(25, 69, 170, 0.5)'
            },
            {
                label: plottedExercise2,
                data: filteredData2.map(workout => workout.weight),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            }]
        });
    }

    const getFreqData = (data) => {
        const workoutDates = data.map(workout => workout.date);
        const monthCount = {};
        workoutDates.forEach(workout => {
            if (!monthCount[workout.slice(0, 2)]) {
                monthCount[workout.slice(0, 2)] = 1;
            } else {
                monthCount[workout.slice(0, 2)] += 1;
            }
        });
        const weekCount = Object.values(monthCount).map(month => Math.floor(month/4));

        setFreqData({
            labels: Object.keys(monthCount).map(month => toMonthName(month)),
            datasets: [{
                label: "# of Workouts Per Week",
                data: weekCount,
                borderColor: 'rgb(25, 69, 170)',
                backgroundColor: 'rgba(25, 69, 170, 0.5)'
            }]
        })
    }

    // convert month number to name
    const toMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString('en-US', {
          month: 'long',
        });
    }

    if (newUser) {
        return (
            <section className="progress">
                <div className="progress__content">
                    <h2 className="progress__welcome">Welcome to onTrack!</h2>
                    <span className="progress__text">Log your first workout to start seeing your progress. Exercises can be added from the
                        <Link className="progress__link" to="/explore/byBodyPart"> Explore</Link> page.</span>
                </div>
            </section>
            
        );
    } else{
        return (
            <section className="progress">
                <h1 className="page-title">My Progress</h1>
                <div className="progress__graphs">
                    <div className="progress__graph-container">
                        <h2 className="progress__graph-title">Weight Progression</h2>
                        <div className="progress__graph">
                            <Line options={options} data={weightData} />
                        </div>
                        {exerciseNames && 
                        <select className="progress__dropdown progress__dropdown--one" value={selectedName1} onChange={(e) => setSelectedName1(e.target.value)}>
                            {exerciseNames.filter(exercise => exercise !== selectedName2).map(name => <option value={name}>{name}</option>)}
                        </select>}
                        {exerciseNames && 
                        <select className="progress__dropdown progress__dropdown--two" value={selectedName2} onChange={(e) => setSelectedName2(e.target.value)}>
                            {exerciseNames.filter(exercise => exercise !== selectedName1).map(name => <option value={name}>{name}</option>)}
                        </select>}
                    </div>
                    <div className="progress__graph-container">
                        <h2 className="progress__graph-title">Average Workout Frequency</h2>
                        <div className="progress__graph">
                            <Bar options={options} data={freqData} />
                        </div>
                        
                    </div>
                </div>
            </section>
        );
    }
}

export default HomePage;