import React from 'react';
import { Link } from 'react-router-dom';

const PasswordInput = ({ password, setPassword }) => (
    <>
        <label htmlFor="password" className="form-label me-2">
            Пароль
        </label>
        <span className="change">
            <Link to="/change_pass">
                <small className="link-color">Забыл пароль</small>
            </Link>
        </span>
        <input
            type="password"
            className="form-control py-2-5"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
    </>
);

export default PasswordInput;
