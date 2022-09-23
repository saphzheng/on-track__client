import './BodyPartDetails.scss';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard';
import ExerciseModal from '../../components/ExerciseModal/ExerciseModal';

const BodyPartDetails = () => {
    const { getAccessTokenSilently } = useAuth0();
    const { bodyPart } = useParams();
    const [ exerciseList, setExerciseList ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ selected, setSelected ] = useState()

    const handleClick = (exercise) => {
        setOpen(true);
        setSelected(exercise);
    }

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
        <>
            <section className="bodypart-details">
            <h1 className="page-title">{bodyPart}</h1>
            <div className="bodypart-details__cards">
                {exerciseList.slice(0,20).map(exercise => 
                    <ExerciseCard key={uuid()} exercise={exercise} handleClick={handleClick} />)}
            </div>
            </section>
            <ExerciseModal open={open} setOpen={setOpen} exercise={selected} />
        </>

    );
}

export default BodyPartDetails;