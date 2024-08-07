import React from 'react';

function BaseNotification({ message, onClose, color, children }) {
    return (
        <div style={{ backgroundColor: color, padding: '45px', borderRadius: '5px', position: 'relative', width: '300px', display: 'block' }}>
            <span>{message}</span>
            <hr />
            <button onClick={onClose} style={{ position: 'absolute', top: '5px', right: '5px' }}>Закрыть</button>
            {children}
        </div>
    );
}

export default BaseNotification;
