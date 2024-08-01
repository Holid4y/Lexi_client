import React from "react";

const Head = ({ doClose }) => (
    <div className="modal-header px-4">
        <h3 className="modal-title ">Добавить текст</h3>
        <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
            onClick={() => doClose(null)}
        >
        </button>
    </div>
);

export default Head;
