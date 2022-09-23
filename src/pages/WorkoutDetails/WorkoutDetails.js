import './WorkoutDetails.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const WorkoutDetails = () => {
    const navigate = useNavigate();
    const { date } = useParams();
    const { getAccessTokenSilently, user } = useAuth0();

    const currentDate = new Date(date);
    const [ workoutData, setWorkoutData ] = useState(undefined);
    
    async function getWorkoutSession() {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get(`http://localhost:8080/exerciseLog/${date}/?user=${user.email}`, {
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
            <i className="workout-details__back bi-chevron-left" onClick={() => navigate(-1)}></i>
            <h1 className="details-title">{currentDate.toDateString()}</h1>
            {workoutData ?
            <ul className="workout-list">
                {workoutData.map(exercise => {
                    return (
                        <li key={uuid()} className="workout-list__entry">
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