import React from 'react';

const SubmitButton = ({ text, handle, disabled }) => (
    <button type="button" className="btn-main mt-4 px-5" onClick={handle} disabled={disabled}>
        <span>{text}</span>
    </button>
);

export default SubmitButton;
