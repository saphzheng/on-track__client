import './WorkoutDetails.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const WorkoutDetails = () => {
    const navigate = useNavigate();
    const { date } = useParams();
    console.log(date)
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

    return (
        <section className="workout-details">
            <i className="back-button bi-chevron-left" onClick={() => navigate(-1)}></i>
            <h1 className="page-title">{currentDate.toDateString()}</h1>
            {console.log(workoutData)}
            {workoutData && workoutData.length === 0 ? null :
            <ul className="workout-details__header">
                <li className="workout-details__label workout-details__label--exercise">Exercise Name</li>
                <li className="workout-details__label">Weight</li>
                <li className="workout-details__label">Sets</li>
                <li className="workout-details__label">Reps</li>
            </ul>}
            {workoutData && workoutData.length !== 0 ?
            <ul className="workout-list">
                {workoutData.map(exercise => {
                    return (
                        <li key={uuid()} className="workout-list__entry">
                            <span className="workout-list__value workout-list__value--exercise">{exercise.exerciseName}</span>
                            <span className="workout-list__value">{exercise.weight}</span>
                            <span className="workout-list__value">{exercise.sets}</span>
                            <span className="workout-list__value">{exercise.reps}</span>
                        </li>
                    )
                })}
            </ul> :
            <span className="workout-details__message">No workouts recorded for this day.</span>}
        </section>
    );
}

export default WorkoutDetails;