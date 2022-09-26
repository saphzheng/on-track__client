import './BodyPartDetails.scss';
import filters from '../../data/filters.json';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import ExerciseCardContainer from '../../components/ExerciseCardContainer/ExerciseCardContainer';

const BodyPartDetails = () => {
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const { bodyPart } = useParams();
    const [ exerciseList, setExerciseList ] = useState([]);
    const [ openFilter, setOpenFilter] = useState(false);
    const [ target, setTarget ] = useState("default");
    const [ equipment, setEquipment ] = useState("default");
    const [ totalPages, setTotalPages ] = useState(1);

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
            setTotalPages(Math.ceil(response.data.length / 20));
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getBodyPartExercises();
    }, []);

    const handleClear = () => {
        setTarget("default");
        setEquipment("default");
    }

    // const test = [];
    // exerciseList.forEach(exercise => test.push(exercise.equipment));
    // const uniqueTargets = [...new Set(test)];
    // console.log(uniqueTargets)

    return (
        <>
        <section className="bodypart-details">
            <i className="back-button bi-chevron-left" onClick={() => navigate(-1)}></i>
            <h1 className="page-title">{bodyPart}</h1>
            <i className="bodypart-details__filter-btn bi-filter" onClick={() => setOpenFilter(!openFilter)}>Filter By</i>
            {/* filter by dropdown menu */}
            <div className={`bodypart-details__filters ${openFilter ? "bodypart-details__filters--open" : ""}`}>
                <label className="bodypart-details__label" htmlFor="target">Target Muscle:
                    <select className="dropdown bodypart-details__dropdown" name="target" id="target" 
                        value={target} onChange={e => setTarget(e.target.value)}>
                        <option value="default" hidden disabled>Select</option>
                        {filters.find(filter => filter.bodyPart === bodyPart).muscles &&
                        filters.find(filter => filter.bodyPart === bodyPart).muscles.map(muscle => {
                            return (
                                <option key={uuid()} value={muscle}>{muscle}</option>
                            );
                        })}
                    </select>
                </label>
                <label className="bodypart-details__label" htmlFor="equipment">Equipment:
                    <select className="dropdown bodypart-details__dropdown" name="equipment" id="equipment" 
                        value={equipment} onChange={e => setEquipment(e.target.value)}>
                        <option value="default" hidden disabled>Select</option>
                        {filters.find(filter => filter.bodyPart === bodyPart).equipment.map(equip => {
                            return (
                                <option value={equip}>{equip}</option>
                            );
                        })}
                    </select>
                </label>
                <button className="bodypart-details__button" onClick={handleClear}>Clear</button>
            </div>
            <ExerciseCardContainer exerciseList={exerciseList} totalPages={totalPages} />
        </section>
        </>
    );
}

export default BodyPartDetails;