import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { throwUser } from "../../../common/reducers/userSlice";
import { host, reset_password_confirm, getResponse } from "../../../../public/urls";
import { Link } from "react-router-dom";

import Header from "../common/Header"
import RegistrationSmallBlock from "../register/components/RegistrationSmallBlock";
import Input from "../common/Input";
import SubmitButton from "../common/SubmitButton";
import Loading from "../../../common/components/Treatment/Loading";

const ForgotPass = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [rePassword, setRePassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { uid, token } = useParams();


    async function handleSubmit() {
        const url = new URL(host + reset_password_confirm);

        const body = {
            uid: uid,
            token: token,
            new_password: newPassword,
            re_new_password: rePassword
        }
        const bodyString = JSON.stringify(body);
        setLoading(true)

        const response = await getResponse(url, "POST", bodyString);

        if (response.ok) {
            doLogout()
        } else {
            const data = await response.json();
            setMessage(JSON.stringify(data));
        }
        setLoading(false)
    };

    const doLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        dispatch(throwUser()); 
        navigate("/login"); // Переход на страницу логина
    };

    return (
        // <div className="body-auth position-relative">
        //     <Header />
        //     <main className="form-signin w-100 m-auto">
        //         <form>
        //             <h2 className="my-5 text-center">Востановление пароля</h2>
        //             <div className="mb-4">
        //                 <Input htmlFor={"newPassword"} label={"Новый пароль"} type={"password"} value={newPassword} setter={setNewPassword} />
        //                 <Input htmlFor={"rePassword"} label={"Повторите пароль"} type={"password"} value={rePassword} setter={setRePassword} />

        //                 <RegistrationSmallBlock />
        //             </div>

        //             {loading && <Loading />}
        //             {message && (
        //                 <div className="alert alert-success">
        //                     {message}
        //                 </div>
        //             )}

        //             <SubmitButton text={'Изменить пароль'} handle={handleSubmit} />
        //         </form>
        //     </main>
        // </div>

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
                                <h1 className="mb-5">Смена пароля</h1>
                                <span>используйте свою почту для восстановления</span>
                                <Input htmlFor={"newPassword"} label={"Новый пароль"} type={"password"} value={newPassword} setter={setNewPassword} />
                                <Input htmlFor={"rePassword"} label={"Повторите пароль"} type={"password"} value={rePassword} setter={setRePassword} />
                                <p className="py-0 my-0"><span className="text-secondary pe-2">Уже зарегистрированы?</span><Link className="link" to="/login">Войти</Link></p>
                                <SubmitButton text={"Регистрация"} handle={handleSubmit} />
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

export default ForgotPass;