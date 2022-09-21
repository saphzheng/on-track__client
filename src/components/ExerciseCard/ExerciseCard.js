import './ExerciseCard.scss';

const ExerciseCard = ({ exercise }) => {

    const exerciseName = exercise.name.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");

    return (
        <div className="exercise-card">
            <img className="exercise-card__gif" src={exercise.gifUrl}/>
            <span className="exercise-card__name">{exerciseName}</span>
            <span className="exercise-card__name">Target Muscles: {exercise.target}</span>
            <span className="exercise-card__name">Requires: {exercise.equipment}</span>
        </div>
    );
}

export default ExerciseCard;