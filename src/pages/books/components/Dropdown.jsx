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
        </>
    );
};

export default Dropdown;
