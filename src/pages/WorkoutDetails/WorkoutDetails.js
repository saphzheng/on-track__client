import './WorkoutDetails.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

const WorkoutDetails = () => {
    const navigate = useNavigate();
    const { date } = useParams();
    const currentDate = new Date(date);
    const { getAccessTokenSilently, user } = useAuth0();
    const [ workoutData, setWorkoutData ] = useState(undefined);
    const [ exerciseToDelete, setExerciseToDelete ] = useState();
    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        getWorkoutSession();
    }, [date, user, open]);  
    
    async function getWorkoutSession() {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get(`http://localhost:8080/exerciseLog/${date}/?user=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            // console.log(response.data);
            setWorkoutData(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete = (exercise) => {
        setExerciseToDelete(exercise);
        setOpen(true);
    }

    return (
        <section className="workout-details">
            <i className="back-button bi-chevron-left" onClick={() => navigate("/workouts")}></i>
            <h1 className="page-title">{currentDate.toDateString()}</h1>
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
                            <i className="workout-list__delete bi-trash3-fill" onClick={() => handleDelete(exercise)}></i>
                        </li>
                    )
                })}
            </ul> :
            <span className="workout-details__message">No workouts recorded for this day.</span>}
            {workoutData && workoutData.length !== 0 ? <i className="workout-details__add bi-plus-square" onClick={() => navigate("/explore/category")}> Add Exercise</i> : null }
            <DeleteModal open={open} setOpen={setOpen} exerciseToDelete={exerciseToDelete} />
        </section>
    );
}

export default WorkoutDetails;