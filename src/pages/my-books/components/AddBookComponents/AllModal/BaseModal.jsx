import React from "react";

import AuthorBookInput from "../common/AuthorBookInput";
import NameBookInput from "../common/NameBookInput";
import AddButton from "../common/AddButton";

function BaseModal({ childComponent, ariaLabelledby, title, idName }) {
    return (
        <div class="modal fade" id={idName} aria-hidden="true" aria-labelledby={ariaLabelledby} tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id={ariaLabelledby}>
                            {title}
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                    {childComponent}

                    <AuthorBookInput />
                    <NameBookInput />
                    <AddButton />

                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" data-bs-target="#AddBookModal" data-bs-toggle="modal">
                            Назад
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BaseModal;
