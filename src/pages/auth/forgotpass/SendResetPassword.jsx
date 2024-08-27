import React, { useState } from "react";

import { host, send_reset_password, getResponse } from "../../../../public/urls";
import { Link } from "react-router-dom";
import Header from "../common/Header"
import RegistrationSmallBlock from "../register/components/RegistrationSmallBlock";
import Input from "../common/Input";
import SubmitButton from "../common/SubmitButton";
import Loading from "../../../common/components/Treatment/Loading";

const SendResetPassword = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit() {
        const url = new URL(host + send_reset_password);
        const body = {
            email: email
        }
        const bodyString = JSON.stringify(body);
        setLoading(true)

        const response = await getResponse(url, "POST", bodyString);

        if (response.ok) {
            setMessage("Письмо востановления пароля отправленно на вашу почту");
            setLoading(false)
        } else {
            const data = await response.json();
            setMessage(JSON.stringify(data));
            setLoading(false)
        }
    };

    return (
        // <div className="body-auth position-relative">
        //     <Header />
        //     <main className="form-signin w-100 m-auto">
        //         <form>
        //             <h2 className="my-5 text-center">Востановление пароля</h2>
        //             <div className="mb-4">
        //                 <Input htmlFor={"email"} label={"Email"} type={"text"} value={email} setter={setEmail} />

        //                 <RegistrationSmallBlock />
        //             </div>
        //             {/* <small>На вашу почту будет отправлено письмо по востановлению пароля</small> */}

        //             {loading && <Loading />}
        //             {message && (
        //                 <div className="alert alert-success">
        //                     {message}
        //                 </div>
        //             )}

        //             <SubmitButton text={'Отправить'} handle={handleSubmit} />
        //         </form>
        //     </main>
        // </div>

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
                                <h1 className="mb-5">Смена пароля</h1>
                                <span>используйте свою почту для восстановления</span>
                                <Input htmlFor={"email"} label={"Email"} type={"text"} value={email} setter={setEmail} />
                                {message && (
                                    <div className="alert alert-success">
                                        {message}
                                    </div>
                                )}
                                <p className="py-0 my-0"><span className="text-secondary pe-2">Уже зарегистрированы?</span><Link className="link" to="/login">Войти</Link></p>
                                <SubmitButton text={"Отправить"} handle={handleSubmit} />
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

export default SendResetPassword;