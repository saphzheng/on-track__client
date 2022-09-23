import './BodyPartDetails.scss';
import filters from '../../data/filters.json';
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
    const [ target, setTarget ] = useState("default");
    const [ equipment, setEquipment ] = useState("default");
    const [ page, setPage] = useState(1);
    const [ totalPages, setTotalPages ] = useState(1);

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

    const renderPageNums = () => {
        let pages = [];

        for(let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages.map(page => <option value={page}>{page}</option>);
    }

    // const test = [];
    // exerciseList.forEach(exercise => test.push(exercise.equipment));
    // const uniqueTargets = [...new Set(test)];
    // console.log(uniqueTargets)

    return (
        <>
            <section className="bodypart-details">
                {console.log(page)}
                <i className="bodypart-details__back bi-chevron-left" onClick={() => navigate(-1)}></i>
                <h1 className="page-title">{bodyPart}</h1>
                <i className="bodypart-details__filter-btn bi-filter" onClick={() => setOpenFilter(!openFilter)}>Filter By</i>
                {/* filter by dropdown menu */}
                <div className={`bodypart-details__filters ${openFilter ? "bodypart-details__filters--open" : ""}`}>
                    <label className="bodypart-details__label" htmlFor="target">Target Muscle:
                        <select className="bodypart-details__dropdown" name="target" id="target" 
                            value={target} onChange={e => setTarget(e.target.value)}>
                            <option value="default" hidden disabled>Select</option>
                            {filters.find(filter => filter.bodyPart === bodyPart).muscles &&
                            filters.find(filter => filter.bodyPart === bodyPart).muscles.map(muscle => {
                                return (
                                    <option value={muscle}>{muscle}</option>
                                );
                            })}
                        </select>
                    </label>
                    {/* <label className="bodypart-details__label" htmlFor="equipment">Equipment:
                        <select className="bodypart-details__dropdown" name="equipment" id="equipment" 
                            value={equipment} onChange={e => setEquipment(e.target.value)}>
                            <option value="default" hidden disabled>Select</option>
                            {filters.find(filter => filter.bodyPart === bodyPart).equipment.map(equip => {
                                return (
                                    <option value={equip}>{equip}</option>
                                );
                            })}
                        </select>
                    </label> */}
                    <button className="bodypart-details__button" onClick={handleClear}>Clear</button>
                </div>
                <div className="bodypart-details__cards">
                <div className="bodypart-details__page-btns bodypart-details__page-btns--top">
                    <i className="bodypart-details__prev bi-caret-left-fill" onClick={() => setPage(page-1)}></i>
                    <i className="bodypart-details__next bi-caret-right-fill"  onClick={() => setPage(page+1)}></i>
                </div>
                    {exerciseList.slice(0+(page-1)*20,20+(page-1)*20).map(exercise => 
                        <ExerciseCard key={uuid()} exercise={exercise} handleClick={handleClick} />)}
                </div>
                <div className="bodypart-details__page-btns bodypart-details__page-btns--bottom">
                    <i className="bodypart-details__prev bi-caret-left-fill" onClick={() => setPage(page-1)}></i>
                    <select className="bodypart-details__dropdown" name="page" id="page" 
                        value={page} onChange={e => setPage(Number(e.target.value))}>
                        {renderPageNums()}
                    </select>
                    <span>/ {totalPages}</span>
                    <i className="bodypart-details__next bi-caret-right-fill" onClick={() => setPage(page+1)}></i>
                </div>
            </section>
            <ExerciseModal open={open} setOpen={setOpen} exercise={selected} />
        </>

    );
}

export default BodyPartDetails;