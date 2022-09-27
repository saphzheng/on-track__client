import './BodyPartDetails.scss';
import filters from '../../data/filters.json';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import ExerciseCardContainer from '../../components/ExerciseCardContainer/ExerciseCardContainer';

const API_URL = process.env.REACT_APP_API_URL;

const BodyPartDetails = () => {
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const { bodyPart } = useParams();
    const [ exerciseList, setExerciseList ] = useState([]);
    const [ openFilter, setOpenFilter] = useState(false);
    const [ target, setTarget ] = useState("default");
    const [ equipment, setEquipment ] = useState("default");
    const [ totalPages, setTotalPages ] = useState(1);

    useEffect(() => {
        getBodyPartExercises();
    }, []);

    async function getBodyPartExercises() {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get(`${API_URL}/exercise/${bodyPart.toLowerCase()}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setExerciseList(response.data);
            setTotalPages(Math.ceil(response.data.length / 20));
        } catch (error) {
            console.log(error.message);
        }
    }
    
    const handleClear = () => {
        setTarget("default");
        setEquipment("default");
    }

    return (
        <>
        <section className="bodypart-details">
            <i className="back-button bi-chevron-left" onClick={() => navigate(-1)}></i>
            <h1 className="page-title">{bodyPart}</h1>
            <i className="bodypart-details__filter-btn bi-filter" onClick={() => setOpenFilter(!openFilter)}>Filter By</i>
            {/* filter by dropdown menu */}
            <div className={`bodypart-details__filters ${openFilter ? "bodypart-details__filters--open" : ""}`}>
                <div className="bodypart-details__dropdowns">
                    <div className="bodypart-details__filter">
                        <label className="bodypart-details__label" htmlFor="target">Target Muscle:</label>
                        <select className="dropdown bodypart-details__dropdown" name="target" id="target" 
                            value={target} onChange={e => setTarget(e.target.value)}>
                            <option value="default" hidden disabled>{window.screen.width < 768 ? "Target" : "Select"}</option>
                            {filters.find(filter => filter.bodyPart === bodyPart).muscles &&
                            filters.find(filter => filter.bodyPart === bodyPart).muscles.map(muscle => {
                                return (
                                    <option key={uuid()} value={muscle}>{muscle}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="bodypart-details__filter">
                        <label className="bodypart-details__label" htmlFor="equipment">Equipment:</label>
                        <select className="dropdown bodypart-details__dropdown" name="equipment" id="equipment" 
                            value={equipment} onChange={e => setEquipment(e.target.value)}>
                                {console.log(window.screen.width)}
                            <option value="default" hidden disabled>{window.screen.width < 768 ? "Equipment" : "Select"}</option>
                            {filters.find(filter => filter.bodyPart === bodyPart).equipment.map(equip => {
                                return (
                                    <option value={equip}>{equip}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <button className="bodypart-details__button" onClick={handleClear}>Clear</button>
            </div>
            <ExerciseCardContainer exerciseList={exerciseList} totalPages={totalPages} />
        </section>
        </>
    );
}

export default BodyPartDetails;