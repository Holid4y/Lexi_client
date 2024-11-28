import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { host, changeEmail, getResponse } from "../../../../public/urls";

import Loading from "../../../common/components/Treatment/Loading";
import Header from "../common/Header";
import Input from "../common/Input";

import SubmitButton from "../common/SubmitButton";

const ChangeEmail = () => {
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);
    
    const [email, setEmail] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [timer, setTimer] = useState(60);
    const [message, setMessage] = useState("");

    async function handleSetEmail() {
        const url = new URL(host + changeEmail);
        const body = { email: email };
        const bodyString = JSON.stringify(body);

        const response = await getResponse(url, "POST", bodyString);
        if (response.ok) {
            setMessage("Письмо отправлено, подтвердите его.");
            setIsButtonDisabled(true);
            startTimer();
        } else if (response.status == 400) {
            const data = await response.json();
            setMessage(data);
        }
    };

    const startTimer = () => {
        setTimer(60);
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsButtonDisabled(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    return (
        <div className="body-auth position-relative">
            <Header />
            {loading && <Loading />}
            {error && <div>{error}</div>}
            <main className="form-signin w-100 m-auto">
                <form>
                    <h2 className="my-5 text-center">Изменить почту</h2>

                    <div className="mb-4">
                        <Input htmlFor={"email"} label={"Email"} type={"text"} value={email} setter={setEmail} />
                    </div>
                    <p>На вашу почту будет отправлено письмо подтверждения.</p>
                    

                    {message && (
                        <div className="alert alert-success">
                            {message}
                            <small>Если письма нет, то проверьте раздел <b>"спам"</b></small>
                        </div>
                    )}

                    
                    <SubmitButton text={"Отправить"} handle={handleSetEmail} 
                    loading={loading}
                    disabled={isButtonDisabled} />
                    
                    {isButtonDisabled && <div>Кнопка будет активна через {timer} секунд.</div>}
                </form>
            </main>
        </div>
    );
};

export default ChangeEmail;
