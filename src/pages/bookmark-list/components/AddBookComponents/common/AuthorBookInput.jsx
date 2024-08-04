import React from "react";

const AuthorBookInput = ({ onTextChange }) => (
    <input className="form-control form-control-lg" type="text" placeholder="Автор книги" onChange={(e) => onTextChange(e.target.value)} />
);

export default AuthorBookInput;
