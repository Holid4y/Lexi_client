import React, { useState, useEffect } from "react";
import { fetchLogin } from "../../../common/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Loading from "../../../common/components/Treatment/Loading";
import Header from "./components/Header";
import LoginInput from "./components/LoginInput";
import PasswordInput from "./components/PasswordInput";
import RegistrationSmallBlock from "./components/RegistrationSmallBlock";
import EnterButton from "./components/EnterButton";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        dispatch(fetchLogin({ username: username, password: password }))
            .then((response) => {
                if (response.meta.requestStatus === "fulfilled") {
                    if (response.payload.access) {
                        navigate("/");
                    }
                } else if (response.meta.requestStatus === "rejected") {
                    console.log("Что-то не верно");
                }
            })
            .catch((error) => {
                console.error("Ошибка при выполнении запроса:", error);
            });
    };

    return (
        <div className="body-auth">
            <Header />
            {loading && <Loading />}
            {error && <div>{error}</div>}
            <main className="form-signin w-100 m-auto">
                <form>
                    <h2 className="mb-4 text-center">Войти в аккаунт</h2>

                    <div className="mb-4">
                        <LoginInput username={username} setUsername={setUsername} />
                        <PasswordInput password={password} setPassword={setPassword} />
                        <RegistrationSmallBlock />
                    </div>

                    <EnterButton handleLogin={handleLogin} />
                </form>
            </main>
        </div>
    );
};

export default Login;
