import React from 'react';

const EnterButton = ({ handleLogin }) => (
    <div className="d-flex justify-content-center my-4">
        <button type="button" className="btn btn-primary save-btn py-2 w-75" onClick={handleLogin}>
            <span>
                <b>Войти</b>
            </span>
        </button>
    </div>
);

export default EnterButton;
