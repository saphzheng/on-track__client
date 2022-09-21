import './ExploreByBodyPart.scss';
import { v4 as uuid } from 'uuid';
import bodyParts from '../../data/bodyParts.json';
import BodyPartCard from '../../components/BodyPartCard/BodyPartCard';

const ExploreByBodyPart = () => {
    return (
        <section className="explore">
            <h1 className="explore__title">Explore Exercises</h1>
            <div className="explore__cards">
                {bodyParts.map(bodyPart => <BodyPartCard key={uuid()} bodyPart={bodyPart} />)}
            </div>
        </section>
    );
}

export default ExploreByBodyPart;