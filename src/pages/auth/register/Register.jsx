import { useState, useEffect } from "react";
import { fetchRegistration } from "../../../common/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../common/components/Notification/NotificationContext";
import { Link } from "react-router-dom";
import Loading from "../../../common/components/Treatment/Loading";
import Header from "../common/Header";
import Input from "../common/Input";
import RegistrationSmallBlock from "./components/RegistrationSmallBlock";
import SubmitButton from "../common/SubmitButton";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errorState, setErrorState] = useState(null);
    const { addNotification } = useNotification();

    useEffect(() => {
        if (error) {
            const formattedErrors = Object.entries(error)
                .map(([field, messages]) =>`${field}: ${messages?.join(', ')}`)
                .join('<br>');
    
            addNotification(
                <span dangerouslySetInnerHTML={{__html:formattedErrors }} />
            );
        }
    }, [error]);

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
                                <h1 className="mb-5">Регистрация</h1>
                                <span>используйте свою почту для регистрации</span>
                                <Input htmlFor={"login"} label={"Логин"} type={"text"} value={username} setter={setUsername} />
                                <Input htmlFor={"email"} label={"Email"} type={"email"} value={email} setter={setEmail} />
                                <div className="row">
                                    <div className="col-12 col-md-6"><Input htmlFor={"password"} label={"Пароль"} type={"password"} value={password} setter={setPassword} /></div>
                                    <div className="col-12 col-md-6"><Input htmlFor={"password2"} label={"Повторите пароль"} type={"password"} value={rePassword} setter={setRePassword} /></div>
                                </div>
                                <p className="py-0 my-0"><span className="text-secondary pe-2">Уже зарегистрированы?</span><Link className="link" to="/login">Войти</Link></p>
                                <SubmitButton text={"Регистрация"} handle={handleRegistration} />
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

export default Register;
