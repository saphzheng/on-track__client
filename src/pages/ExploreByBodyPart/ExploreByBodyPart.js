import './ExploreByBodyPart.scss';
import bodyParts from '../../data/bodyParts.json';
import BodyPartCard from '../../components/BodyPartCard/BodyPartCard';

const ExploreByBodyPart = () => {
    return (
        <section className="explore-list">
            <h1 className="explore-list__title">Explore Exercises</h1>
            <div className="explore-list__cards">
                {bodyParts.map(bodyPart => <BodyPartCard bodyPart={bodyPart} />)}
            </div>
        </section>
    );
}

export default ExploreByBodyPart;