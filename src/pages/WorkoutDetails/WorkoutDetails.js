import './WorkoutDetails.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

const API_URL = process.env.REACT_APP_API_URL;

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
            const response = await axios.get(`${API_URL}/exerciseLog/${date}/?user=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
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
            <i className="back-button bi-chevron-left" onClick={() => navigate("/workouts/overview")}></i>
            <h1 className="page-title">{currentDate.toDateString()}</h1>
            {workoutData && workoutData.length !== 0 ?
            <ul className="workout-details__header">
                <li className="workout-details__label workout-details__label--exercise">Exercise Name</li>
                <li className="workout-details__label workout-details__label--weight">Weight</li>
                <li className="workout-details__label">Sets</li>
                <li className="workout-details__label">Reps</li>
            </ul> : null}
            {workoutData && workoutData.length !== 0 ?
            <ul className="workout-list">
                {workoutData.map(exercise => {
                    return (
                        <>
                        <li key={uuid()} className="list-entry list-entry--table workout-list__entry">
                            <span className="workout-list__name">{exercise.exerciseName}</span>
                            <span className="workout-list__value">{exercise.weight}</span>
                            <span className="workout-list__value">{exercise.sets}</span>
                            <span className="workout-list__value">{exercise.reps}</span>
                            <i className="workout-list__delete bi-trash3-fill" onClick={() => handleDelete(exercise)}></i>
                        </li>
                        <li key={uuid()} className="list-entry list-entry--condensed workout-list__entry">
                            <span className="workout-list__name">{exercise.exerciseName}</span>
                            <div className="workout-list__stats"> 
                                <div className="workout-list__stat-column">
                                    <span className="workout-list__descriptor">Sets: <span className="workout-list__value">{exercise.sets}</span></span>
                                    <span className="workout-list__descriptor">Reps: <span className="workout-list__value">{exercise.reps}</span></span>
                                </div>
                                <div className="workout-list__stat-column">
                                    <span className="workout-list__descriptor">Weight: <span className="workout-list__value">{exercise.weight}</span></span>
                                    <i className="workout-list__delete bi-trash3-fill" onClick={() => handleDelete(exercise)}></i>
                                </div>
                            </div>
                        </li>
                        </>
                    );
                })}
            </ul> :
            <p className="workout-details__message">No workouts recorded for this day.</p>}
            <i className="workout-details__add bi-plus-square" onClick={() => navigate("/explore")}> Add Exercise</i>
            <DeleteModal open={open} setOpen={setOpen} exerciseToDelete={exerciseToDelete} />
        </section>
    );
}

export default WorkoutDetails;