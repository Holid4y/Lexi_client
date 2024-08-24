import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { throwState } from "../../../../../common/reducers/addBookModalSlice";

import AuthorBookInput from "../common/AuthorBookInput";
import NameBookInput from "../common/NameBookInput";
import AddButton from "../common/AddButton";
import IsPrivet from "../common/IsPrivetButton";
import SVG from "../../../../../common/components/Icons/SVG";

function BaseModal({ childComponent, ariaLabelledby, title, idName }) {
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
                        <button className='btn btn-sm d-flex align-items-center px-0' data-bs-target="#AddBookModal" data-bs-toggle="modal">
                            <SVG name="arrow_left" />
                            <span className="ps-2">Назад</span>
                        </button>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {childComponent}
                        <AuthorBookInput />
                        <NameBookInput  />
                        <IsPrivet />
                        <AddButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BaseModal;
