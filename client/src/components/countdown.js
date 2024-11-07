import { useState, useEffect } from 'react';

const Timer = ({ initialMinute = 0, initialSeconds = 0, callback }) => {
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    callback()
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <>
            {minutes === 0 && seconds === 0
                ? null
                : <span className='fw-semibold'> 0{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
            }
        </>
    )
}

export default Timer;
