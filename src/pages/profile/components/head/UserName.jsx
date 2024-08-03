import React from 'react';
import { useSelector } from "react-redux";

const UserName = () => {
    const { username } = useSelector((state) => state.user);

    return (
        <h1 className="text-uppercase text-break mb-2">
            {username}
        </h1>
    );
};

export default UserName;
