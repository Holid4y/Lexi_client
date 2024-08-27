import React, { useState } from "react";
import { fetchLogin } from "../../../common/reducers/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../common/Input";
import SubmitButton from "../common/SubmitButton";
import { useNotification } from "../../../common/components/Notification/NotificationContext";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        <div className="d-flex text-center text-bg-dark main-box">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" >
                <header className="container mb-auto">
                    <div>
                    <h3 className="float-md-start mb-0">Lexi</h3>
                    <nav className="nav nav-masthead justify-content-center float-md-end">
                        <Link className="nav-link fw-bold py-1 px-0" to="/landing">Главная</Link>
                        <Link className="nav-link fw-bold py-1 px-0" to="/instruction">Интерактив</Link>
                        <a className="nav-link fw-bold py-1 px-0" href="#">О нас</a>
                    </nav>
                    </div>
                </header>

                <div className="container-main position-relative">
                    <div className="auth">
                        <div className="form-container">
                            <form>
                                <h1 className="mb-5">Авторизация</h1>
                                <span>используйте свою почту для входа</span>
                                <Input htmlFor={"login"} label={"Логин или Email"} type={"text"} value={username} setter={setUsername} />
                                <Input htmlFor={"password"} label={"Пароль"} type={"password"} value={password} setter={setPassword} />
                                <p className="py-0 my-0"><span className="text-secondary pe-2">Не зарегистрированы?</span><Link className="link" to="/register">Регистрация</Link></p>
                                <Link className="btn btn-sm text-secondary" to="/send-reset-password">Забыл пароль ?</Link>
                                <SubmitButton text={"Войти"} handle={handleLogin} />
                                
                            </form>
                        </div>
                    </div>
                </div>

                <footer className="mt-auto text-white-50">
                    <p>Cover template for <a href="https://getbootstrap.com/" className="text-white">Bootstrap</a>, by <a href="https://twitter.com/mdo" className="text-white">@mdo</a>.</p>
                </footer>
            </div>
        </div>
    );
};

export default Login;
