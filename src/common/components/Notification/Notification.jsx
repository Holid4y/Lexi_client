import React, { useEffect, useState } from 'react';

function Notification({ message, onClose, timeout, position }) {
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const fadeOutDuration = 2000; // Длительность анимации исчезновения
        const delay = timeout - fadeOutDuration;

        const timer = setTimeout(() => {
            setIsFadingOut(true);
            const removeTimer = setTimeout(() => {
                onClose();
            }, fadeOutDuration);
            return () => clearTimeout(removeTimer);
        }, delay);

        return () => clearTimeout(timer);
    }, [timeout, onClose]);

    return (
        <div aria-live="polite" aria-atomic="true" className="notification-wrapper">
            <div
                className={`toast-container position-fixed end-0 p-3 d-none d-md-block ${isFadingOut ? 'fade-out' : ''}`}
                style={{ bottom: `${position * 100}px` }} // Обновляем положение
            >
                <div className={`toast fade show mb-2 ${isFadingOut ? 'fade-out' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">Уведомление</strong>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="toast-body text-start">
                        {message}
                    </div>
                </div>
            </div>
            <div
                className={`toast-container position-fixed start-50 translate-middle-x p-3 d-block d-md-none ${isFadingOut ? 'fade-out' : ''}`}
                style={{ top: `${position * 50}px` }} // Обновляем положение
            >
                <div className={`toast fade show mb-2 ${isFadingOut ? 'fade-out' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            {message}
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" aria-label="Close" onClick={onClose}></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notification;
