import React from 'react';
import BaseNotification from './BaseNotification';

function ActionNotification({ message, onClose, onConfirm, onCancel, nameNotification }) {
    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
            <BaseNotification message={message} onClose={onClose} color="lightcoral" name={nameNotification}>
                <button type="button" class="btn btn-lg btn-primary" onClick={onConfirm}>Подтвердить</button>
                <button type="button" class="btn btn-lg btn-secondary" onClick={onCancel}>Отменить</button>
            </BaseNotification>
        </div>
    );
}

export default ActionNotification;
