import './BodyPartCard.scss';
import { Link } from 'react-router-dom';

const BodyPartCard = ({ bodyPart }) => {

    return (
        <Link to={`/exercise/${bodyPart.name}`} className="bodypart-card">
            <img className="bodypart-card__image" src="https://via.placeholder.com/150"/>
            <span className="bodypart-card__name">{bodyPart.name}</span>
        </Link>
    );
}

export default BodyPartCard;