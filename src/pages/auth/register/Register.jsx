import { useState, useEffect } from "react";
import { fetchRegistration } from "../../../common/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../common/components/Notification/NotificationContext";
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
                .map(([field, messages]) =>`${field}: ${messages.join(', ')}`)
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
        <div className="body-auth position-relative">
            <Header />
            
            <main className="form-signin w-100 m-auto">
                <form>
                    <h2 className="my-5 text-center">Регистрация</h2>
                    <div className="mb-4">
                        <Input htmlFor={"login"} label={"Логин"} type={"text"} value={username} setter={setUsername} />
                        <Input htmlFor={"email"} label={"Email"} type={"email"} value={email} setter={setEmail} />
                        <Input htmlFor={"password"} label={"Пароль"} type={"password"} value={password} setter={setPassword} />
                        <Input htmlFor={"password2"} label={"Повторите пароль"} type={"password"} value={rePassword} setter={setRePassword} />

                        <RegistrationSmallBlock />
                    </div>

                    {loading && <Loading />}
                    {errorState && errorState}

                    <SubmitButton text={"Регистрация"} handle={handleRegistration} />
                </form>
            </main>
        </div>
    );
};

export default Register;
