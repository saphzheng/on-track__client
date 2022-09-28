import './HomePage.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Line, Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const HomePage = () => {
    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
    Chart.defaults.color = "#000";
    const { user, getAccessTokenSilently } = useAuth0();
    const [ exerciseList, setExerciseList ] = useState();
    const [ weightData, setWeightData ] = useState();
    const [ freqData, setFreqData ] = useState();
    const [ exerciseNames, setExerciseNames ] = useState();
    const [ selectedName1, setSelectedName1 ] = useState();
    const [ selectedName2, setSelectedName2 ] = useState();
    const [ newUser, setNewUser ] = useState(true);
    // const [ showGraphs, setShowGraphs ] = useState(false);

    // options for graph
    const options = {
        responsive: true,
        spanGaps: true,
        plugins: {
            legend: {
                display: false
            }
        },
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
            console.log(token)
            const response = await axios.get(`${API_URL}/exerciseLog/?user=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            if (newUser && response.data.length !== 0) {
                setNewUser(false);
            } 
            setExerciseList(response.data.slice(0,15));
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
                borderColor: 'rgb(255, 179, 0)',
                backgroundColor: 'rgb(255, 179, 0)'
            },
            {
                label: plottedExercise2,
                data: filteredData2.map(workout => workout.weight),
                borderColor: 'rgb(24, 82, 218)',
                backgroundColor: 'rgb(24, 82, 218)'
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
            labels: Object.keys(monthCount).sort().map(month => toMonthName(month)),
            datasets: [{
                label: "# of Workouts Per Week",
                data: weekCount,
                borderColor: 'rgb(255, 179, 0)',
                backgroundColor: 'rgb(255, 179, 0)'
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
                        <Link className="progress__link" to="/explore"> Explore</Link> page.</span>
                </div>
            </section>
            
        );
    } else {
        return (
            <section className="progress">
                <div className="progress__graphs">
                    <div className="progress__graph-container">
                        <div className="progress__graph-wrapper">
                            <h2 className="progress__graph-title">Weight Progression</h2>
                            <Line options={options} data={weightData} />
                        </div>
                        {exerciseNames && 
                        <div className="progress__dropdowns">
                            <div className="progress__dropdown-container">
                                <div className="progress__dropdown-label progress__dropdown-label--one"></div>
                                <select className="dropdown progress__dropdown progress__dropdown--one" value={selectedName1} onChange={(e) => setSelectedName1(e.target.value)}>
                                    {exerciseNames.filter(exercise => exercise !== selectedName2).map(name => <option value={name}>{name}</option>)}
                                </select>
                            </div>
                            <div className="progress__dropdown-container">
                                <div className="progress__dropdown-label progress__dropdown-label--two"></div>
                                <select className="dropdown progress__dropdown progress__dropdown--two" value={selectedName2} onChange={(e) => setSelectedName2(e.target.value)}>
                                    {exerciseNames.filter(exercise => exercise !== selectedName1).map(name => <option value={name}>{name}</option>)}
                                </select>
                            </div>
                        </div>}
                    </div>
                    <div className="progress__graph-container progress__graph-container--freq">
                        <h2 className="progress__graph-title">Average # of Workouts per Week</h2>
                        <Bar options={options} data={freqData} />
                    </div>
                </div>
                <div className="progress__table">
                    <h2 className="progress__graph-title">Recent Exercises</h2>
                    <ul className="progress-list">
                        <ul className="workout-details__header">
                            <li className="progress-list__label">Date</li>
                            <li className="workout-details__label workout-details__label--exercise">Exercise Name</li>
                            <li className="workout-details__label workout-details__label--weight">Weight</li>
                            <li className="workout-details__label">Sets</li>
                            <li className="workout-details__label">Reps</li>
                        </ul>
                        {exerciseList && exerciseList.map(exercise => {
                            return (
                                <>
                                <li key={uuid()} className="list-entry list-entry--table progress-list__entry">
                                    <span className="progress-list__date">{exercise.date}</span>
                                    <span className="workout-list__name">{exercise.exerciseName}</span>
                                    <span className="workout-list__value">{exercise.weight}</span>
                                    <span className="workout-list__value">{exercise.sets}</span>
                                    <span className="workout-list__value">{exercise.reps}</span>
                                </li>
                                <li key={uuid()} className="list-entry list-entry--condensed progress-list__entry">
                                    <span className="workout-list__name">{exercise.exerciseName}</span>
                                    <div className="workout-list__stats"> 
                                        <div className="workout-list__stat-column">
                                            <span className="progress-list__value">{exercise.date}</span>
                                            <span className="progress-list__descriptor">Weight: <span className="progress-list__value">{exercise.weight}</span></span>
                                        </div>
                                        <div className="workout-list__stat-column">
                                            <span className="progress-list__descriptor">Sets: <span className="progress-list__value">{exercise.sets}</span></span>
                                            <span className="progress-list__descriptor">Reps: <span className="progress-list__value">{exercise.reps}</span></span>
                                        </div>
                                    </div>
                                </li>
                                </>
                            );
                        })}
                    </ul>
                </div>
            </section>
        );
    } 
}

export default HomePage;