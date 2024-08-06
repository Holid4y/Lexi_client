import React from "react";

function NameBookInput({ value, onChange }) {
    return (
        <input
            className="form-control form-control-lg" 
            type="text" 
            placeholder="Название книги" 
            style={{ marginBottom: "10px" }} 
            value={value}
            onChange={onChange} 
        />
    );
}

export default NameBookInput;
