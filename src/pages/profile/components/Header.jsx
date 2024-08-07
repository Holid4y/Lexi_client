import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPutSettings } from "../../../common/reducers/userSlice";

import SVG from "../../../common/components/Icons/SVG";

const Header = ({ hasChanges, dataToSave, setHasChanges }) => {
    const dispatch = useDispatch();
    const { putLoading } = useSelector((state) => state.user);

    const handleSave = () => {
        dispatch(fetchPutSettings(dataToSave));
        setHasChanges(false)
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="container sticky-top mb-3 pt-2">
            <nav className="navbar dark-nav px-3 position-relative">
                <button className='btn btn-sm d-flex align-items-center px-0' onClick={handleGoBack}>
                    <SVG name="arrow_left" />
                    <span className='ps-2'>Назад</span>
                </button>
                <span className="navbar-brand position-absolute top-50 start-50 translate-middle">
                    Профиль
                </span>
                {putLoading ? (
                    <button className="btn mx-0 text-success" disabled>
                        <span className="visually-hidden">Загрузка...</span>
                    </button>
                ) : hasChanges ? (
                    <button className="btn mx-0 text-success" onClick={handleSave}>
                        Сохранить
                    </button>
                ) : null}
            </nav>
        </div>
    );
};

export default Header;
