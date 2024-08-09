import React from 'react';

// всплывающее окно для подтверждения действия

function ActionNotification({ message, onConfirm, onCancel, nameNotification }) {
    return (
        <div style={{ position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
            <div className="modal-dialog">
                <div className="modal-content rounded-4 shadow py-3 px-5 text-start bg-input-color">
                    <div className="modal-header border-bottom-0">
                        <h1 className="modal-title fs-3">{nameNotification}</h1>
                    </div>
                    <div className="modal-body py-0 my-2 text-start">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                        <button type="button" className="btn btn-lg btn-primary" onClick={onConfirm}>Подтвердить</button>
                        <button type="button" className="btn btn-lg btn-secondary" onClick={onCancel}>Отменить</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActionNotification;
