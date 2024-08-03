import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { throwUser } from "../../../../common/reducers/userSlice";

const ExitButton = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        dispatch(throwUser()); 
        navigate("/login"); // Переход на страницу логина
    };

    return (
        <button className="form-control mb-3 py-2-5 d-flex justify-content-between" onClick={handleLogout}>
            <span className="text-start text-danger">Выйти</span>
        </button>
    );
};

export default ExitButton;
