import React, { useState, useEffect } from "react";

const Timer = ({ duration, onTimerEnd }) => {
    const [timer, setTimer] = useState(() => {
        const savedTime = localStorage.getItem("timer");
        const savedTimestamp = localStorage.getItem("timerTimestamp");
        if (savedTime && savedTimestamp) {
            const timeElapsed = Math.floor((Date.now() - savedTimestamp) / 1000);
            const remainingTime = savedTime - timeElapsed;
            return remainingTime > 0 ? remainingTime : duration;
        }
        return duration;
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Вызов onTimerEnd после завершения рендеринга, когда таймер достигает 0
    useEffect(() => {
        if (timer === 0) {
            onTimerEnd(); // Вызываем onTimerEnd только после того, как таймер достигнет 0
        }
    }, [timer, onTimerEnd]);

    useEffect(() => {
        if (timer > 0) {
            localStorage.setItem("timer", timer);
            localStorage.setItem("timerTimestamp", Date.now());
        }
    }, [timer]);

    return <div>Повторную отправку можно сделать через {timer} секунд.</div>;
};

export default Timer;
