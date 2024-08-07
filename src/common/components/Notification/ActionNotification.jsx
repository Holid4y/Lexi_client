import React from 'react';
import BaseNotification from './BaseNotification';

function ActionNotification({ message, onClose, onConfirm, onCancel }) {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000
        }}>
            <BaseNotification message={message} onClose={onClose} color="lightcoral">
                <button onClick={onCancel}>Отменить</button>
                <button onClick={onConfirm}>Подтвердить</button>
            </BaseNotification>
        </div>
    );
}

export default ActionNotification;
