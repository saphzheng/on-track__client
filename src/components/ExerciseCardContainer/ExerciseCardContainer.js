import './ExerciseCardContainer.scss';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import ExerciseModal from '../ExerciseModal/ExerciseModal';

const ExerciseCardContainer = ({ exerciseList, totalPages }) => {
    const [ open, setOpen ] = useState(false);
    const [ selected, setSelected ] = useState()
    const [ page, setPage] = useState(1);
    
    const handleClick = (exercise) => {
        setOpen(true);
        setSelected(exercise);
    }

    const renderPageNums = () => {
        let pages = [];

        for(let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages.map(page => <option key={uuid()} value={page}>{page}</option>);
    }

    return (
        <>
            <div className="exercise-cards">
                <div className="exercise-cards__page-btns exercise-cards__page-btns--top">
                    <i className={`exercise-cards__prev bi-caret-left-fill ${page === 1 ? "disabled" : ""}`} onClick={() => setPage(page-1)}></i>
                    <i className={`exercise-cards__next bi-caret-right-fill ${page === totalPages ? "disabled" : ""}`}  onClick={() => setPage(page+1)}></i>
                </div>
                {exerciseList.slice(0+(page-1)*30,30+(page-1)*30).map(exercise => 
                    <ExerciseCard key={uuid()} exercise={exercise} handleClick={handleClick} />)}
            </div>
            <div className="exercise-cards__page-btns exercise-cards__page-btns--bottom">
                <i className={`exercise-cards__prev bi-caret-left-fill ${page === 1 ? "disabled" : ""}`} onClick={() => setPage(page-1)}></i>
                <select className="dropdown exercise-cards__dropdown" name="page" id="page" 
                    value={page} onChange={e => setPage(Number(e.target.value))}>
                    {renderPageNums()}
                </select>
                <span>/ {totalPages}</span>
                {console.log(page, totalPages)}
                <i className={`exercise-cards__next bi-caret-right-fill ${page === totalPages ? "disabled" : ""}`} onClick={() => setPage(page+1)}></i>
            </div>
            <ExerciseModal open={open} setOpen={setOpen} exercise={selected} />
        </>
    );
}

export default ExerciseCardContainer;