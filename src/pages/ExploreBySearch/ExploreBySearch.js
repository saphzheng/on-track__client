import './ExploreBySearch.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import axios from 'axios';
import ExerciseCardContainer from '../../components/ExerciseCardContainer/ExerciseCardContainer';

const API_URL = process.env.REACT_APP_API_URL;

const ExploreBySearch = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [ query, setQuery ] = useState("");
    const [ totalPages, setTotalPages ] = useState();
    const [ exerciseList, setExerciseList ] = useState();

    async function handleSearch () {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get(`${API_URL}/exercise/search/${query}`, {
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

    return (
        <>
        <section className="search">
            <h1 className="page-title">Explore Exercises</h1>
            <div className="search__cta">
                <input className="form-field search__input" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..."></input>
                <i className="search__button bi-search" onClick={handleSearch}></i>
            </div>
            {exerciseList ? 
                <ExerciseCardContainer exerciseList={exerciseList} totalPages={totalPages} /> :
                <span className="search__instructions">Enter a keyword from an exercise, body part, muscle, or equipment.</span>}
        </section>
        </>
    );
}

export default ExploreBySearch;