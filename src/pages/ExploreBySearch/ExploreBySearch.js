import './ExploreBySearch.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ExerciseCardContainer from '../../components/ExerciseCardContainer/ExerciseCardContainer';

const API_URL = process.env.REACT_APP_API_URL;

const ExploreBySearch = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [ totalPages, setTotalPages ] = useState();
    const [ exerciseList, setExerciseList ] = useState();
    const { query } = useParams();

    useEffect(() => {
        getSearch();
    }, []);

    async function getSearch () {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get(`${API_URL}/exercise/search/${query}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setExerciseList(response.data);
            setTotalPages(Math.ceil(response.data.length / 30));
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
        <section className="search">
            <h1 className="page-title">Showing results for "{query}"</h1>
            <div className="search__space"></div>
            {exerciseList ? <ExerciseCardContainer exerciseList={exerciseList} totalPages={totalPages} /> : null }
        </section>
        </>
    );
}

export default ExploreBySearch;