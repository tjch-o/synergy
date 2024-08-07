import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

interface DateSelectProps {
    selected: DatePickerProps["selected"];
    onSelect: DatePickerProps["onChange"];
}

const DateSelect = ({ selected, onSelect }: DateSelectProps) => {
    return (
        <DatePicker
            selected={selected}
            onChange={onSelect}
            isClearable
            customInput={
                <button className="p-2 text-white bg-transparent border-none cursor-pointer focus:outline-none">
                    <FaCalendarAlt size={24} />
                </button>
            }
        />
    );
};

export default DateSelect;
