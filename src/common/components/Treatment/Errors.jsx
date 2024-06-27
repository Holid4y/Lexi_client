import React from 'react';

const Errors = ({ error }) => {
    return (
        <div className="d-flex justify-content-center">
            <div>
                <div className="spinner-border spinner-border-sm me-1" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <span>Ошибка {error}</span>
            </div>
        </div>
    );
};

export default Errors;
