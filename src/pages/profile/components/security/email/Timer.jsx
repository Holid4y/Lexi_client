import React, { useState, useEffect } from "react";

const Timer = ({ duration, onTimerEnd }) => {
    const [timer, setTimer] = useState(duration);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    onTimerEnd();
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [onTimerEnd]);

    return (
        <div>
            Кнопка будет активна через {timer} секунд.
        </div>
    );
};

export default Timer;