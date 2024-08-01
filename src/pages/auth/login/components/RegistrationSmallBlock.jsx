import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationSmallBlock = () => (
    <p className="fs-8 text-center mt-2">
        <span className="pe-2">Не зарегистрированы?</span>
        <Link className="link-color" to="/register">
            Регистрация
        </Link>
    </p>
);

export default RegistrationSmallBlock;