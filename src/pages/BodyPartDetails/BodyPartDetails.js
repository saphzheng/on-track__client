import './ExploreByBodyPart.scss';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const ExploreByBodyPart = () => {
    const { getAccessTokenSilently } = useAuth0();
    const [ exerciseList, setExerciseList ] = useState([]);

    async function getBodyPartExercises() {
        try {
            const token = await getAccessTokenSilently();
            const response = await axios.get("http://localhost:8080/exercise", {
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
        <section className="explore-list">

        </section>
    );
}

export default ExploreByBodyPart;