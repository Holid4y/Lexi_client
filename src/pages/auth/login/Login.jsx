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
            <div className="container d-flex w-100 h-100 p-3 mx-auto flex-column" >
                <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between mb-auto">
                    <div class="col-md-4 mb-2 mb-md-0 d-none d-md-block">
                        <h3 className="float-md-start mb-0">Lexi</h3>
                    </div>

                    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/landing" class="nav-link px-2 link-secondary">Главная</Link></li>
                        <li><Link to="/instruction" class="nav-link px-2 link-secondary">Интерактив</Link></li>
                        <li><Link to="/about" class="nav-link px-2 link-secondary">О нас</Link></li>
                    </ul>

                    <div class="col-md-4 text-end">
                        <Link to="/login" class="btn btn-outline-primary me-2">Вход</Link>
                        <Link to="/register" class="btn btn-primary">Регистрация</Link>
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
