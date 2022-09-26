import './ExploreByBodyPart.scss';
import { v4 as uuid } from 'uuid';
import { useState } from 'react'
import bodyParts from '../../data/bodyParts.json';
import BodyPartHighlighter from '../../components/BodyPartHighlighter/BodyPartHighlighter';

const ExploreByBodyPart = () => {
    const [ bodyPart, setBodyPart ] = useState("");



    return (
        <section className="explore">
            <h1 className="page-title">Explore Exercises</h1>
            {/* <div className="explore__cards">
                {bodyParts.map(bodyPart => <BodyPartCard key={uuid()} bodyPart={bodyPart} />)}
            </div> */}
            
            <div className="explore__content">
                <ul className="explore-list">
                    {bodyParts.map(bodyPart => 
                        <li key={uuid()} className="explore-list__item" onMouseOver={() => setBodyPart(bodyPart)}>{bodyPart.name}</li>)}
                </ul>
                <BodyPartHighlighter bodyPart={bodyPart} />
            </div>
        </section>
    );
}

export default ExploreByBodyPart;