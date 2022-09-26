import './DeleteModal.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';

const DeleteModal = ({ open, setOpen, exerciseToDelete }) => {
    const { getAccessTokenSilently, user } = useAuth0();

    if (!open || !exerciseToDelete) {
        return null;
    }

    const exerciseDate = new Date(exerciseToDelete.date);

    async function handleConfirm(e) {
        e.preventDefault();

        try {
            const token = await getAccessTokenSilently();
            const response = await axios.delete(`http://localhost:8080/exerciseLog/${exerciseToDelete.id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setOpen(false);
        } catch (error) {
            console.log(error.message);
            setOpen(false);
        }
    }

    return (
        <>
            <div className="modal-overlay"></div>
            <div className="delete-modal">
                <i className="delete-modal__close bi-x-lg" onClick={() => setOpen(false)} />
                <div className="delete-modal__content">
                    <h2 className="delete-modal__title">Delete {exerciseToDelete.exerciseName} from {exerciseDate.toDateString()}?</h2>
                    <p className="delete-modal__info">Once you remove {exerciseToDelete.exerciseName} from the workout, this action cannot be undone.</p>
                    <div className="delete-modal__buttons">
                        <button className="secondary-button" onClick={() => setOpen(false)}>Cancel</button>
                        <button className="delete-button" onClick={handleConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteModal; 