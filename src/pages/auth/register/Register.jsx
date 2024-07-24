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
            <header className="navbar sticky-top position-absolute">
                <svg className="logo" width="156" height="58" viewBox="0 0 156 58" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M47.8138 57C46.9438 57 46.1938 56.685 45.5638 56.055C44.9638 55.425 44.6638 54.675 44.6638 53.805V29.55C44.6638 28.05 45.1588 26.94 46.1488 26.22C47.1388 25.47 48.6538 25.095 50.6938 25.095V51.78H62.8438C64.2538 51.78 65.3188 52.23 66.0388 53.13C66.7588 54 67.1188 55.29 67.1188 57H47.8138ZM78.8195 57.405C76.9595 57.405 75.2645 57.045 73.7345 56.325C72.2045 55.575 70.9895 54.57 70.0895 53.31C69.1895 52.02 68.7395 50.58 68.7395 48.99V43.005C68.7395 41.325 69.2045 39.81 70.1345 38.46C71.0645 37.11 72.2945 36.045 73.8245 35.265C75.3845 34.485 77.0645 34.095 78.8645 34.095C80.6345 34.095 82.2545 34.47 83.7245 35.22C85.2245 35.94 86.4095 36.96 87.2795 38.28C88.1495 39.57 88.5845 41.055 88.5845 42.735V45.255C88.5845 45.915 88.3295 46.47 87.8195 46.92C87.3395 47.37 86.7245 47.595 85.9745 47.595H74.1845V48.585C74.1845 49.875 74.5745 50.925 75.3545 51.735C76.1345 52.545 77.3045 52.95 78.8645 52.95C80.3645 52.95 81.4745 52.62 82.1945 51.96C82.9445 51.3 83.3195 50.445 83.3195 49.395C83.8595 49.335 84.2345 49.305 84.4445 49.305C85.5545 49.305 86.4245 49.56 87.0545 50.07C87.6845 50.55 87.9995 51.24 87.9995 52.14C87.9995 53.01 87.5945 53.85 86.7845 54.66C85.9745 55.47 84.8645 56.13 83.4545 56.64C82.0445 57.15 80.4995 57.405 78.8195 57.405ZM83.4995 43.59V42.735C83.4995 41.475 83.0645 40.455 82.1945 39.675C81.3245 38.895 80.1995 38.505 78.8195 38.505C77.4395 38.505 76.3145 38.895 75.4445 39.675C74.6045 40.425 74.1845 41.445 74.1845 42.735V43.59H83.4995ZM93.1443 57.405C92.5743 57.405 91.9893 57.315 91.3893 57.135C90.7893 56.955 90.3093 56.67 89.9493 56.28L97.8693 45.345L90.6693 34.95C90.9093 34.68 91.3293 34.47 91.9293 34.32C92.5593 34.17 93.1293 34.095 93.6393 34.095C95.1993 34.095 96.2943 34.56 96.9243 35.49L100.839 41.655L99.9393 42.96L100.254 43.185L105.339 35.49C105.909 34.56 107.064 34.095 108.804 34.095C109.284 34.095 109.809 34.17 110.379 34.32C110.949 34.47 111.354 34.68 111.594 34.95L104.349 45.345L112.314 56.28C111.954 56.67 111.489 56.955 110.919 57.135C110.379 57.315 109.839 57.405 109.299 57.405C108.669 57.405 108.054 57.285 107.454 57.045C106.854 56.835 106.434 56.55 106.194 56.19L101.109 48.675L96.0693 56.19C95.7993 56.58 95.3943 56.88 94.8543 57.09C94.3443 57.3 93.7743 57.405 93.1443 57.405Z"
                        fill="white"
                    />
                    <path
                        d="M111.492 31.36C110.612 31.36 109.865 31.08 109.252 30.52C108.665 29.9333 108.372 29.2 108.372 28.32C108.372 27.44 108.665 26.7067 109.252 26.12C109.865 25.5067 110.612 25.2 111.492 25.2C112.345 25.2 113.078 25.5067 113.692 26.12C114.332 26.7067 114.652 27.44 114.652 28.32C114.652 29.1733 114.332 29.8933 113.692 30.48C113.078 31.0667 112.345 31.36 111.492 31.36Z"
                        fill="white"
                    />
                </svg>
            </header>
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

                        <p className="fs-8 text-center mt-2">
                            <span className="pe-2">Уже зарегистрированы?</span>
                            <Link className="link-color" to="/login">Войти</Link>
                        </p>
                    </div>

                    <div className="d-flex justify-content-center my-4">
                        <button type="button" className="btn btn-primary save-btn py-2 w-75" onClick={handleRegistration}>
                            <span>
                                <b>Регистрация</b>
                            </span>
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Register;
