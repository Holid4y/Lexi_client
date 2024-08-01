import React from "react";
import { Link } from "react-router-dom";

const RegistrationSmallBlock = () => (
    <p className="fs-8 text-center mt-2">
        <span className="pe-2">Уже зарегистрированы?</span>
        <Link className="link-color" to="/login">
            Войти
        </Link>
    </p>
);

export default RegistrationSmallBlock;
