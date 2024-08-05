import React from "react";

import AuthorBookInput from "../common/AuthorBookInput";
import NameBookInput from "../common/NameBookInput";
import AddButton from "../common/AddButton";
import SVG from "../../../../../common/components/Icons/SVG";

function BaseModal({ childComponent, ariaLabelledby, title, idName }) {
    return (
        <div class="modal fade" id={idName} aria-hidden="true" aria-labelledby={ariaLabelledby} tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content rounded-4 shadow">
                    <div class="modal-header ps-0">
                        <button class="btn" data-bs-target="#AddBookModal" data-bs-toggle="modal">
                            <SVG name="arrow_left" /><span className="ps-2">Назад</span>
                        </button>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                    {childComponent}

                    <AuthorBookInput />
                    <NameBookInput />
                    <AddButton />

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BaseModal;
