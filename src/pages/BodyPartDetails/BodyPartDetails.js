import './BodyPartDetails.scss';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard';

const BodyPartDetails = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [ exerciseList, setExerciseList ] = useState([]);
    const { bodyPart } = useParams();

    async function getBodyPartExercises() {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get(`http://localhost:8080/exercise/${bodyPart.toLowerCase()}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setExerciseList(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getBodyPartExercises();
    }, []);

    return (
        <section className="bodypart-details">
            <h1 className="page-title">{bodyPart}</h1>
            <div className="bodypart-details__cards">
                {exerciseList.slice(0,12).map(exercise => <ExerciseCard key={uuid()} exercise={exercise} />)}
            </div>
        </section>
    );
}

export default BodyPartDetails;