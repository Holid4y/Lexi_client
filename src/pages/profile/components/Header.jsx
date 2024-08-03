import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPutSettings } from '../../../common/reducers/userSlice'; 

const Header = ({ hasChanges, dataToSave }) => {
    const dispatch = useDispatch(); 
    const { putLoading } = useSelector((state) => state.user);

    const handleSave = () => {
        dispatch(fetchPutSettings(dataToSave)); 
    };

    return (
        <div className="container sticky-top mb-4 pt-2">
            <nav className="navbar dark-nav">
                <div className="container-fluid px-1">
                    <span className="navbar-brand">Профиль</span>
                    {putLoading ? (
                        <button className="btn mx-0 text-success" disabled>
                            <span className="visually-hidden">Загрузка...</span>
                        </button>
                    ) : hasChanges ? (
                        <button className="btn mx-0 text-success" onClick={handleSave}>
                            Сохранить
                        </button>
                    ) : null}
                </div>
            </nav>
        </div>
    );
};

export default Header;
