import React, { useState, useEffect } from "react";
import AuthorBookInput from "../common/AuthorBookInput";
import NameBookInput from "../common/NameBookInput";
import AddButton from "../common/AddButton";
import SVG from "../../../../../common/components/Icons/SVG";

function BaseModal({ childComponent, ariaLabelledby, title, idName }) {

    return (
        <div className="modal fade" id={idName} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={ariaLabelledby} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header ps-0">
                        <button className="btn" data-bs-target="#AddBookModal" data-bs-toggle="modal">
                            <SVG name="arrow_left" /><span className="ps-2">Назад</span>
                        </button>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {childComponent}
                        <AuthorBookInput />
                        <NameBookInput  />
                        <AddButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BaseModal;
