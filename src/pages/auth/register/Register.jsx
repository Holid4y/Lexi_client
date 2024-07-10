import React, { useState, useEffect } from "react";
import { fetchRegistration } from "../../../common/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Loading from "../../../common/components/Treatment/Loading";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [errorState, setErrorState] = useState(null);

    useEffect(() => {
        if (error) {
            setErrorState(JSON.stringify(error))
        }
    }, [error]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRePasswordChange = (event) => {
        setRePassword(event.target.value);
    };

    const handleRegistration = () => {
        console.log("Начало регистрации");
        console.log("Отправляемые данные:");
        console.log({ username, email, password, rePassword });

        dispatch(
            fetchRegistration({
                username: username,
                email: email,
                password: password,
                re_password: rePassword,
            })
        )
            .then((response) => {
                console.log("Ответ от сервера:", response);

                if (response.meta.requestStatus === "fulfilled") {
                    if (response.payload) {
                        console.log("Успешная регистрация, переход на страницу логина");
                        navigate("/login");
                    } else {
                        console.log("Ошибка: Нет пользователя");
                    }
                } else if (response.meta.requestStatus === "rejected") {
                    console.log("Ошибка: Запрос отклонен");
                }
            })
            .catch((error) => {
                console.error("Ошибка при выполнении запроса:", error);
                if (error.response && error.response.data) {
                    console.error("Ошибка сервера:", error.response.data);
                }
            });
    };

    const LoadingView = <Loading />;

    return (
        <div className="body-auth">
            <header className="navbar sticky-top position-absolute">{/* ... */}</header>
            {loading && LoadingView}
            {errorState && errorState}
            <main className="form-signin w-100 m-auto">
                <form>
                    <h2 className="mb-4 text-center">Регистрация</h2>
                    <div className="mb-2">
                        <label htmlFor="login" className="form-label">
                            Login
                        </label>
                        <input type="text" className="form-control py-2-5" id="login" value={username} onChange={handleUsernameChange} />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input type="email" className="form-control py-2-5" id="email" value={email} onChange={handleEmailChange} />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password1" className="form-label">
                            Пароль
                        </label>
                        <input type="password" className="form-control py-2-5 mb-2" id="password1" value={password} onChange={handlePasswordChange} />

                        <label htmlFor="password2" className="form-label">
                            Повторите пароль
                        </label>
                        <input type="password" className="form-control py-2-5" id="password2" value={rePassword} onChange={handleRePasswordChange} />

                        <p className="fs-8 link-color text-center mt-2">
                            <span className="pe-2">Уже зарегистрированы?</span>
                            <Link to="/login">Войти</Link>
                        </p>
                    </div>

                    <div className="text-center">
                        <a type="submit" className="btn btn-lg btn-primary-auth px-5 mb-2" onClick={handleRegistration}>
                            Регистрация
                        </a>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Register;
