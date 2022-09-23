import './BodyPartDetails.scss';
import targets from '../../data/targets.json';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard';
import ExerciseModal from '../../components/ExerciseModal/ExerciseModal';

const BodyPartDetails = () => {
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const { bodyPart } = useParams();
    const [ exerciseList, setExerciseList ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ selected, setSelected ] = useState()
    const [ openFilter, setOpenFilter] = useState(false);

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


    // const targets = [];
    // exerciseList.forEach(exercise => targets.push(exercise.target));
    // const uniqueTargets = [...new Set(targets)];
    // console.log(uniqueTargets)

    return (
        <>
            <section className="bodypart-details">
                <i className="bodypart-details__back bi-arrow-left" onClick={() => navigate(-1)}></i>
                <h1 className="page-title">{bodyPart}</h1>
                <i className="bodypart-details__filter-btn bi-filter" onClick={() => setOpenFilter(!openFilter)}>Filter By</i>
                <div className={`bodypart-details__filters ${openFilter ? "bodypart-details__filters--open" : ""}`}>
                    <select name="target">
                        {targets.find(target => target.bodyPart === bodyPart).muscles.map(muscle => {
                            return (
                                <option value={muscle}>{muscle}</option>
                            );
                        })}
                    </select>
                </div>
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