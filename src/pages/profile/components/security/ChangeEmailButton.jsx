import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { host, changeEmail, getResponse } from "../../../../../public/urls";

import Input from "./Input";
import Loading from "../../../../common/components/Treatment/Loading";

import SubmitButton from "./SubmitButton";

const ChangeEmailButton = () => {
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
        <div>
            <button type="button" className="form-control mb-3 py-2-5 d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#changeEmail">
                <span className="text-start">Изменить почту</span>
                <span className="text-end">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                    </svg>
                </span>
            </button>

            <div className="modal fade" id="changeEmail" tabIndex="-1" aria-labelledby="changeEmailLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="changeEmailLabel">Смена почты</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-4">
                                    <Input htmlFor={"email"} label={"Email"} type={"text"} value={email} setter={setEmail} />
                                </div>
                                <p>На вашу почту будет отправлено письмо подтверждения.</p>
                                
                                {message && (
                                    <div className="alert alert-success">
                                        {message}<br/>
                                        <small>Если письма нет, то проверьте раздел <b>"спам"</b></small>
                                    </div>
                                )}

                                <SubmitButton text={"Отправить"} handle={handleSetEmail} disabled={isButtonDisabled} />
                                {isButtonDisabled && <div>Кнопка будет активна через {timer} секунд.</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeEmailButton;
