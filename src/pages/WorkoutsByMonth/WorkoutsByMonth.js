import './WorkoutsByMonth.scss';
import Calendar from '../../components/Calendar/Calendar';
import { useState } from 'react';
import { format } from "date-fns";

const WorkoutsByMonth = () => {
    const [ currentDate, setCurrentDate ] = useState(new Date());
    const handleSetToday = () => setCurrentDate(new Date());

    return (
        <section className="workouts">
            <h1 className="page-title">My Workouts</h1>
            <div className="workouts__content">
                <div className="workouts__dates">
                    <strong className="workouts__month">{format(currentDate, "LLLL")}</strong>
                    <strong className="workouts__year">{format(currentDate, "yyyy")}</strong>
                </div>
                <Calendar value={currentDate} onChange={setCurrentDate} />
                <button className="primary-button workouts__button" onClick={handleSetToday}>Today</button>
            </div>
        </section>
    );
}

export default WorkoutsByMonth;