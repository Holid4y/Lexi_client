import React, { useEffect } from 'react';
import BaseNotification from './BaseNotification';

function InformationNotification({ message, onClose, timeout, nameNotification }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Закрыть уведомление по истечении времени
        }, timeout);

        return () => clearTimeout(timer); // Очистить таймер при размонтировании компонента
    }, [timeout, onClose]);

    return (
        <div style={{ position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
            <BaseNotification message={message} onClose={onClose} color="lightblue" name={nameNotification} />
        </div>
    );
}

export default InformationNotification;
