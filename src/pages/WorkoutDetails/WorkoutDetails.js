import './WorkoutDetails.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const WorkoutDetails = () => {
    const { date } = useParams();
    const { getAccessTokenSilently } = useAuth0();

    const currentDate = new Date(date);
    const [ workoutData, setWorkoutData ] = useState(undefined);
    
    async function getWorkoutSession() {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get(`http://localhost:8080/workout/${date}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setWorkoutData(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getWorkoutSession();
    }, [date]);

    console.log(workoutData)

    return (
        <section className="workout-details">
            <h1 className="details-title">{currentDate.toDateString()}</h1>
            {workoutData ?
            <ul className="workout-list">
                {workoutData.exercises.map(exercise => {
                    return (
                        <li>
                            <span>{exercise.exerciseName}</span>
                            Weight: {exercise.weight}
                            Sets: {exercise.sets}
                            Reps: {exercise.reps}
                        </li>
                    )
                })}
            </ul> :
            <span>No workouts recorded for this day</span>}
        </section>
    );
}

export default WorkoutDetails;