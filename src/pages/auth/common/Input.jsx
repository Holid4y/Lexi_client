import React from 'react';

const Input = ({ htmlFor, label, type, value, setter }) => (
    <input type={type} placeholder={label} id={htmlFor} value={value} onChange={(e) => setter(e.target.value)} />
);

export default Input;
