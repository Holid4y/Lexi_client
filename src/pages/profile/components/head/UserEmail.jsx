import React from 'react';
import { useSelector } from "react-redux";

const UserEmail = () => {
    const { email } = useSelector(
        (state) => state.user
    );
    return (
        <span className="fs-5 text-secondary text-break">
            {email}
        </span>
    );
};

export default UserEmail;
