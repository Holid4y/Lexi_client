import React from "react";
import { Link } from "react-router-dom";

const RegistrationSmallBlock = () => (
    <p className="fs-8 text-center mt-2">
        <span className="pe-2">Не зарегистрированы?</span>
        <Link className="link-color" to="/register">
            Регистрация 
        </Link>
        <span className="change">
            <Link to="/forgot-password">
                <small className="link-color"> / Забыл пароль</small>
            </Link>
        </span>
    </p>
);

export default RegistrationSmallBlock;
