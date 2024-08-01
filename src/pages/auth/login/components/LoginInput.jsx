import React from 'react';

const LoginInput = ({ username, setUsername }) => (
    <div className="mb-2">
        <label htmlFor="login" className="form-label">
            Login или Email
        </label>
        <input
            type="text"
            className="form-control py-2-5"
            id="login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
    </div>
);

export default LoginInput;
