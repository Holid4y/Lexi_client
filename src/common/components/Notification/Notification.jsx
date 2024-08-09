import React, { useEffect, useRef } from 'react';

function Notification({ message, onClose, timeout, position, actions }) {
    const toastRef = useRef(null);

    useEffect(() => {
        if (timeout > 0) {
            const timer = setTimeout(() => {
                onClose(); 
            }, timeout);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [timeout, onClose]);

    return (
        <div aria-live="polite" aria-atomic="true" className="notification-wrapper">
            <div className="toast-container position-fixed end-0 p-3 d-none d-md-block" style={{ bottom: `${position * 100}px` }} >
                <div ref={toastRef} className="toast fade show mb-2" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">Уведомление</strong>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="toast-body text-start">
                        {message}
                        {actions && (
                            <div className="notification-actions mt-2">
                                {actions.map((action, index) => (
                                    <button
                                        key={index}
                                        className="btn btn-sm btn-primary me-2"
                                        onClick={action.onClick}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="toast-container position-fixed start-50 translate-middle-x p-3 d-block d-md-none" style={{ top: `${position * 50}px` }} >
                <div ref={toastRef} className="toast fade show mb-2" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="d-flex">
                        <div class="toast-body">
                            {message}
                        </div>
                        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notification;
