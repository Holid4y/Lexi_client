import React, { useState, useEffect } from "react";
import { fetchLogin } from "../../../common/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../../../common/components/Treatment/Loading";
import Header from "../common/Header";
import Input from "../common/Input";
import RegistrationSmallBlock from "./components/RegistrationSmallBlock";
import SubmitButton from "../common/SubmitButton";
import { useNotification } from "../../../common/components/Notification/NotificationContext";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { addNotification } = useNotification();

    const handleLogin = () => {
        dispatch(fetchLogin({ username: username, password: password }))
            .then((response) => {
                if (response.meta.requestStatus === "fulfilled") {
                    if (response.payload.access) {
                        navigate("/");
                    }
                } else if (response.meta.requestStatus === "rejected") {
                    addNotification(`Неверный логин или пароль`)
                }
            })
    };

    return (
        <div className="body-auth position-relative">
            <Header />
            
            <main className="form-signin w-100 m-auto">
                <form>
                    <h2 className="my-5 text-center">Войти в аккаунт</h2>

                    <div className="mb-4">
                        <Input htmlFor={"login"} label={"Логин или Email"} type={"text"} value={username} setter={setUsername} />
                        <Input htmlFor={"password"} label={"Пароль"} type={"password"} value={password} setter={setPassword} />
                        <RegistrationSmallBlock />
                    </div>
                    {loading && <Loading />}
                    

                    <SubmitButton text={"Войти"} handle={handleLogin} />

                    <div className="text-center">
                        <Link className="btn btn-sm text-secondary fs-8" to="/send-reset-password">Забыл пароль</Link>
                    </div>
                    
                </form>
            </main>
        </div>
    );
};

export default Login;
