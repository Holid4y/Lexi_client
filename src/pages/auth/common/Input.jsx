import React from 'react';

const Input = ({ htmlFor, label, type, value, setter }) => (
    <div className="mb-2">
        <label htmlFor={htmlFor} className="form-label">
            {label}
        </label>
        <input
            type={type}
            className="form-control py-2-5"
            id={htmlFor}
            value={value}
            onChange={(e) => setter(e.target.value)}
        />
    </div>
);

export default Input;
