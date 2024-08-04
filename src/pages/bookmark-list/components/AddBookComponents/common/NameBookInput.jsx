import React from 'react';

const NameBookInput = ({ onTextChange }) => (
  <input
    className="form-control form-control-lg"
    type="text"
    placeholder="Название книги"
    style={{ marginBottom: '10px' }}
    onChange={(e) => onTextChange(e.target.value)}
  />
);

export default NameBookInput;
