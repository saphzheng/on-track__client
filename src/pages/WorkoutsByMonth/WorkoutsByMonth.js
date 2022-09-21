import './WorkoutsByMonth.scss';
import Calendar from '../../components/Calendar/Calendar';
import { useState } from 'react';
import { format } from "date-fns";

const WorkoutsByMonth = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleSetToday = () => setCurrentDate(new Date());
    return (
        <section className="workouts">
            <h1 className="workouts__title">My Workouts</h1>
            <div className="workouts__content">
                <div className="workouts__dates">
                    <button className="workouts__button text-white bg-blue-600 active:bg-blue-700 text-sm px-4 py-1.5 rounded" onClick={handleSetToday}>
                        Today
                    </button>
                    <strong className="workouts__month">{format(currentDate, "LLLL")}</strong>
                    <strong className="workouts__year">{format(currentDate, "yyyy")}</strong>
                </div>
                <Calendar value={currentDate} onChange={setCurrentDate} />
            </div>
        </section>
    );
}

export default WorkoutsByMonth;