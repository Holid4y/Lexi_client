import React from "react";

const AddButton = ({ onSubmit }) => (
    <button type="button" className="btn btn-lg btn-primary mt-4 w-100" onClick={() => onSubmit()}>
        Добавить
    </button>
);

export default AddButton;
