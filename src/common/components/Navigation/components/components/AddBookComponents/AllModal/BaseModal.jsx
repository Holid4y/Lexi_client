import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { throwState } from "../../../../../../reducers/addBookModalSlice";

import SVG from "../../../../../../components/Icons/SVG";


/* BaseModal отлично закрывет функционал "Назад" и его не приходится писать для всех доченрних модалок */

function BaseModal({ childComponent, ariaLabelledby, title, idName, file }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const modalElement = document.getElementById(idName);
        const handleModalClose = () => {
            dispatch(throwState());
        };
        modalElement.addEventListener("hidden.bs.modal", handleModalClose);
        return () => {
            modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
        };
    }, []);
    return (
        <div className="modal fade" id={idName} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={ariaLabelledby} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header">
                        <button className='btn btn-sm d-flex align-items-center px-0' data-bs-target={idName} data-bs-toggle="modal">
                            <SVG name="arrow_left" />
                            <span className="ps-2">Назад</span>
                        </button>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        
                        
                        {/* Сюда передаются дочерние модалки */}
                        {childComponent}
                        

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BaseModal;
