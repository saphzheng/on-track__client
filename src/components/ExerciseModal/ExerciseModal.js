import './ExerciseModal.scss';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const ExerciseModal = ({ open, setOpen, exercise }) => {
    const { getAccessTokenSilently } = useAuth0();

    if (!open || !exercise) {
        return null;
    }

    const exerciseName = exercise.name.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");

    const closeModal = () => {
        setOpen(false);
    }

    async function handleAdd() {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get(`http://localhost:8080/workout/`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="modal-overlay"></div>
            <div className="exercise-modal">
                <i className="exercise-modal__close bi-x-lg" onClick={closeModal} />

                <h2 className="exercise-modal__title">{exerciseName}</h2>
                <p className="exercise-modal__text">Target Muscle: <span>{exercise.target}</span></p>
                <div className="exercise-modal__buttons">
                    <button className="button exercise-modal__button exercise-modal__button--cancel" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default ExerciseModal; 