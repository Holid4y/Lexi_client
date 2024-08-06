import React from "react";

function AuthorBookInput({ value, onChange }) {
    return (
        <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Автор книги"
            value={value}
            onChange={onChange}
        />
    );
}

export default AuthorBookInput;
