import { KeyboardEvent, createRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import moment from 'moment';
import './PointForm.less';

interface Props {
    defaultDate?: string;
    defaultTime?: string;
    defaultDescription?: string;
    handleSubmit: (timestamp: string, description: string) => void;
    handleCancel: () => void;
}

export default function PointForm({ handleSubmit, handleCancel, defaultDescription, defaultDate, defaultTime }: Props) {
    const ref = createRef<HTMLInputElement>();
    const [date, setDate] = useState(defaultDate ? new Date(defaultDate) : new Date());
    const [timeString, setTimeString] = useState(defaultTime ?? moment().format('HH:mm:ss'));

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        const description = ref.current?.value ?? '';
        const timestamp = moment(moment(date).format('YYYY-MM-DD') + ' ' + timeString).toISOString();
        handleSubmit(timestamp, description);
    };

    return (
        <div onKeyDown={handleKeyDown}>
            <input className="description" ref={ref} placeholder={defaultDescription}></input>
            <DatePicker selected={date} onChange={(date) => date && setDate(date)} />
            <TimePicker value={timeString} onChange={(value) => value && setTimeString(value)} />
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}
