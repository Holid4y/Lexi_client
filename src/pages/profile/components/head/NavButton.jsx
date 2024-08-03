import React from "react";
import { useSelector } from "react-redux";

import { isActivatedEmail } from "../../utils/utils";

const NavButton = () => {
    const { activated_email } = useSelector((state) => state.user);

    return (
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item w-50 text-center" role="presentation">
                <button
                    className="nav-link w-100 active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="home-tab-pane"
                    aria-selected="true"
                >
                    Настройки
                </button>
            </li>
            <li className="nav-item w-50 text-center" role="presentation">
                <button
                    className="nav-link w-100"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="profile-tab-pane"
                    aria-selected="false"
                >
                    Безопасность
                    {isActivatedEmail(activated_email) ? null : <small className="ms-2 badge bg-warning text-dark">!</small>}
                </button>
            </li>
        </ul>
    );
};

export default NavButton;
