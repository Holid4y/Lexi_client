import React from 'react';

function BaseNotification({ message, onClose, color, children, name }) {
    return (
        <div class="modal-dialog">
            <div class="modal-content rounded-4 shadow py-3 px-5 text-start bg-input-color">
                <div class="modal-header border-bottom-0">
                    <h1 class="modal-title fs-3">{name}</h1>
                </div>
                <div class="modal-body py-0 my-2 text-start">
                    <p>{message}</p>
                </div>
                <div class="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default BaseNotification;
