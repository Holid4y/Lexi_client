import React, {useState} from "react";

import SVG from "../../../common/components/Icons/SVG";
import Trash from "./Trash";

const Dropdown = ({ book, index }) => {
    const [notification, setNotification] = useState(null);

    return (
        <>
            <div>
                <button class="position-absolute translate-middle mark_settings btn" data-bs-toggle="dropdown" aria-expanded="false">
                    <SVG name="dot_settings" />
                </button>
                <ul class="dropdown-menu text-small shadow p-2">
                    <li><button class="dropdown-item">Редактировать</button></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><Trash book={book} index={index} setNotification={setNotification}/></li>
                </ul>
            </div>
            {notification}
            {/* <div class="modal fade" id="modalSheet" tabindex="-1" aria-labelledby="modalSheetLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content rounded-4 shadow">
                    <div class="modal-header border-bottom-0">
                        <h1 class="modal-title fs-5">Удаление книги</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body py-0 text-start">
                        <p>После удаления книги <b>{book.title}</b> вы не сможете её востановить</p>
                    </div>
                    <div class="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
                        <button type="button" class="btn btn-lg btn-primary" onClick={() => handleDelete()}>Удалить</button>
                        {notification}
                        <button type="button" class="btn btn-lg btn-secondary" data-bs-dismiss="modal">Оставить</button>
                    </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Dropdown;
