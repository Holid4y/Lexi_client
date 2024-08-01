import React from 'react';

const SubmitButton = ({ text, handle }) => (
    <div className="d-flex justify-content-center my-4">
        <button type="button" className="btn btn-primary save-btn py-2 w-75" onClick={handle}>
            <span>
                <b>{text}</b>
            </span>
        </button>
    </div>
);

export default SubmitButton;
