import './ExerciseCard.scss';

const ExerciseCard = ({ exercise }) => {

    return (
        <div className="exercise-card">
            <img className="exercise-card__gif" src={exercise.gifUrl}/>
            <span className="exercise-card__name">{exercise.name}</span>
        </div>
    );
}

export default ExerciseCard;