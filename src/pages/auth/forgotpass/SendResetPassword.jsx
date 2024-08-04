import React, { useState } from "react";

import { host, send_reset_password, getResponse } from "../../../../public/urls";

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
        <div className="body-auth">
            <Header />
            <main className="form-signin w-100 m-auto">
                <form>
                    <h2 className="mb-4 text-center">Востановление пароля</h2>
                    <small>Введите адрес электронной почты, который вы использовали при регистрации</small>
                    <div className="mb-4">
                        <Input htmlFor={"email"} label={"Email"} type={"text"} value={email} setter={setEmail} />

                        <RegistrationSmallBlock />
                    </div>
                    <small>На эту почту прийдет письмо востановления пароля</small>

                    {loading && <Loading />}
                    {message && (
                        <div className="alert alert-success">
                            {message}
                        </div>
                    )}

                    <SubmitButton text={'Отправить'} handle={handleSubmit} />
                </form>
            </main>
        </div>
    );
};

export default SendResetPassword;