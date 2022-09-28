import './ExploreByBodyPart.scss';
import { v4 as uuid } from 'uuid';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import bodyParts from '../../data/bodyParts.json';
import BodyPartHighlighter from '../../components/BodyPartHighlighter/BodyPartHighlighter';

const ExploreByBodyPart = () => {
    const navigate = useNavigate();
    const [ bodyPart, setBodyPart ] = useState("");

    return (
        <section className="explore">
            <h1 className="page-title">Explore Exercises</h1>
            <h2 className="page-subtitle">Click a body part category from the list or model to see targeted exercises.</h2>
            <div className="explore__content">
                <ul className="explore-list">
                    {bodyParts.map(bodyPart => {
                        return (
                            <>
                            <li key={uuid()} className="explore-list__item" onMouseOver={() => setBodyPart(bodyPart)} 
                                onClick={() => navigate(`/explore/${bodyPart.name}`)}>{bodyPart.name}</li>
                            <i className="explore-list__arrow bi-chevron-right"></i>
                            </>
                        )})}
                </ul>
                <BodyPartHighlighter bodyPart={bodyPart} />
            </div>
        </section>
    );
}

export default ExploreByBodyPart;