import './ExerciseCard.scss';

const ExerciseCard = ({ exercise, handleClick }) => {

    const exerciseName = exercise.name.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");

    return (
        <div className="exercise-card" onClick={() => handleClick(exercise)}>
            <img className="exercise-card__gif" src={exercise.gifUrl}/>
            <span className="exercise-card__name">{exerciseName}</span>
        </div>
    );
}

export default ExerciseCard;