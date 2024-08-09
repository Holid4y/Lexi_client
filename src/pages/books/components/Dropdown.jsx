import React, {useState} from "react";

import SVG from "../../../common/components/Icons/SVG";
import Trash from "./Trash";

const Dropdown = ({ book, index }) => {
    const [notification, setNotification] = useState(null);

    return (
        <>
            <div>
                <button className="position-absolute translate-middle mark_settings btn" data-bs-toggle="dropdown" aria-expanded="false">
                    <SVG name="dot_settings" />
                </button>
                <ul className="dropdown-menu text-small shadow p-2">
                    <li><button className="dropdown-item">Редактировать</button></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Trash book={book} index={index} setNotification={setNotification}/></li>
                </ul>
            </div>
            {notification}
        </>
    );
};

export default Dropdown;
