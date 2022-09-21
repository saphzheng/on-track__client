import './Calendar.scss';
import { add, differenceInDays, format, endOfMonth, setDate, startOfMonth, sub } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Cell from '../CalendarCell/CalendarCell';

const Calendar = ({ value, onChange }) => {
    const navigate = useNavigate();

    const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const startDate = startOfMonth(value);
    const endDate = endOfMonth(value);
    const numDays = differenceInDays(endDate, startDate) + 1;
    
    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();
    
    const prevMonth = () => onChange(sub(value, { months: 1 }));
    const nextMonth = () => onChange(add(value, { months: 1 }));
    const prevYear = () => onChange(sub(value, { years: 1 }));
    const nextYear = () => onChange(add(value, { years: 1 }));
    
    const handleClickDate = (index) => {
        const date = setDate(value, index);
        console.log(format(date, "LLddyyyy"));
        onChange(date);
        // navigate(`/workouts/${format(date, "LLddyyyy")}`);
    };

    return (
        <div className="w-[50vw] border-t border-l">
            <div className="grid grid-cols-7 items-center justify-center text-center">
                <Cell key={uuid()} />
                <Cell onClick={prevYear}>{"<<"}</Cell>
                <Cell onClick={prevMonth}>{"<"}</Cell>
                <Cell key={uuid()} />
                <Cell onClick={nextMonth}>{">"}</Cell>
                <Cell onClick={nextYear}>{">>"}</Cell>
                <Cell key={uuid()} />

                {weeks.map((week) => (
                <Cell className="text-xs font-bold uppercase">{week}</Cell>
                ))}

                {Array.from({ length: prefixDays }).map((_, index) => (
                <Cell key={index} />
                ))}

                {Array.from({ length: numDays }).map((_, index) => {
                const date = index + 1;
                const isCurrentDate = date === value.getDate();

                return (
                    <Cell key={date} isActive={isCurrentDate} onClick={() => handleClickDate(date)}>
                        {date}
                    </Cell>
                );
                })}

                {Array.from({ length: suffixDays }).map((_, index) => (
                    <Cell key={index} />
                ))}
            </div>
        </div>
    );
}

export default Calendar;