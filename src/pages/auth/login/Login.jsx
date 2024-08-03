import React, { useState, useEffect } from "react";
import { fetchLogin } from "../../../common/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loading from "../../../common/components/Treatment/Loading";
import Header from "../common/Header";
import Input from "../common/Input";
import RegistrationSmallBlock from "./components/RegistrationSmallBlock";
import SubmitButton from "../common/SubmitButton";

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
                        <Input htmlFor={"login"} label={"Логин или Email"} type={"text"} value={username} setter={setUsername} />
                        <Input htmlFor={"password"} label={"Пароль"} type={"password"} value={password} setter={setPassword} />
                        <RegistrationSmallBlock />
                    </div>

                    <SubmitButton text={"Войти"} handle={handleLogin} />
                    
                </form>
            </main>
        </div>
    );
};

export default Login;
