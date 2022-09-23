import './ExerciseModal.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';

const ExerciseModal = ({ open, setOpen, exercise }) => {
    const navigate = useNavigate();
    const { getAccessTokenSilently, user } = useAuth0();
    const [ openForm, setOpenForm ] = useState(false);
    const [ submit, setSubmit ] = useState(false);
    const [ message, setMessage ] = useState("");

    if (!open || !exercise) {
        return null;
    }

    const titleCase = (string) => {
        return string.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
    }

    const closeModal = () => {
        setOpenForm(false);
        setSubmit(false);
        setOpen(false);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const weight = e.target.weight.value || 0;
        const sets = e.target.sets.value || 0;
        const reps = e.target.reps.value || 0;

        try {
            const token = await getAccessTokenSilently();
            const body = {
                "exerciseName": titleCase(exercise.name),
                "weight": weight,
                "sets": sets,
                "reps": reps,
                "date": format(new Date(), "LL-dd-yyyy"),
                "user": user.email
            };
            const response = await axios.post(`http://localhost:8080/exerciseLog`, body, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setMessage("Added Successfully!");
            setSubmit(true);
        } catch (error) {
            console.log(error.message);
            setMessage("Error Adding - Try Again.");
            setSubmit(true);
        }
    }

    if(!submit) {
        return (
            <>
                <div className="modal-overlay"></div>
                <div className="exercise-modal">
                    <i className="exercise-modal__close bi-x-lg" onClick={closeModal} />
                    <div className="exercise-modal__content">
                        <img className="exercise-modal__gif" src={exercise.gifUrl}/>
                        <div className="exercise-modal__right">
                            <h2 className="exercise-modal__title">{titleCase(exercise.name)}</h2>
                            <p className="exercise-modal__info">Target Muscle: <span className="exercise-modal__detail">{titleCase(exercise.target)}</span></p>
                            <p className="exercise-modal__info">Requires: <span className="exercise-modal__detail">{titleCase(exercise.equipment)}</span></p>
                            <div className="exercise-modal__buttons">
                                <button className={`primary-button exercise-modal__button--add ${openForm? "primary-button--disabled" : ""}`} onClick={() => setOpenForm(!openForm)}>Add To Today's Workout</button>
                            </div>
                        </div>
                    </div>
                    <form className={`exercise-modal__form ${openForm? "exercise-modal__form--open" : ""}`} onSubmit={handleSubmit}>
                        <label className="exercise-modal__label" htmlFor="weight">Weight:</label>
                        <input className="form-field exercise-modal__input" type="number" name="weight" id="weight"></input>
                        <span className="exercise-modal__units">lbs</span>
                        <label className="exercise-modal__label" htmlFor="sets">Sets:</label>
                        <input className="form-field exercise-modal__input" type="number" name="sets" id="sets"></input>
                        <label className="exercise-modal__label" htmlFor="reps">Reps:</label>
                        <input className="form-field exercise-modal__input" type="number" name="reps" id="reps"></input>
                        <button className="primary-button exercise-modal__button--submit">Submit</button>
                    </form>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="modal-overlay"></div>
                <div className="exercise-modal">
                    <h2 className="exercise-modal__title">{message}</h2>
                    <button className="secondary-button exercise-modal__button--close" onClick={closeModal}>Return To Exercises</button>
                    <button className="primary-button exercise-modal__button--today" onClick={() => navigate('/workouts/today')}>Go To Today's Workout</button>
                </div>
            </>
        )
    }
}

export default ExerciseModal; 