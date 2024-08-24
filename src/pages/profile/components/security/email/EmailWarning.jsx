import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getResponse, host, resend } from "../../../../../../public/urls";
import Timer from "./Timer";
import Loading from "../../../../../common/components/Treatment/Loading";

function EmailWarning() {
    const { email } = useSelector((state) => state.user);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    useEffect(() => {
        // Проверяем наличие сохраненного таймера в localStorage
        const savedTime = localStorage.getItem("timer");
        const savedTimestamp = localStorage.getItem("timerTimestamp");

        if (savedTime && savedTimestamp) {
            const timeElapsed = Math.floor((Date.now() - savedTimestamp) / 1000);
            const remainingTime = savedTime - timeElapsed;

            if (remainingTime > 0) {
                setIsEmailSent(true);
                setIsButtonDisabled(true);
            }
        }
    }, []);

    async function handleSendActivationEmail() {
        const url = new URL(host + resend);
        const body = { email: email };
        const bodyString = JSON.stringify(body);

        setLoading(true);
        setIsButtonDisabled(true);

        const response = await getResponse(url, "POST", bodyString);
        if (response.ok) {
            startTimer();
            setLoading(false);
            setIsEmailSent(true);
        } else if (response.status === 400) {
            const data = await response.json();
            setLoading(false);
        }
    }

    const startTimer = () => {
        setIsButtonDisabled(true);
    };

    const handleTimerEnd = () => {
        setIsButtonDisabled(false);
        setIsEmailSent(false);
    };

    return (
        <div className="d-flex justify-content-between mb-3">
            {isEmailSent ? ( // Если письмо было отправлено или есть активный таймер, показываем таймер
                <div className="ms-2">
                    <Timer duration={60} onTimerEnd={handleTimerEnd} />
                </div>
            ) : (
                <p className="pt-2">
                    <small className="me-2 badge bg-warning text-dark">!</small>
                    <span>Ваша почта не подтверждена</span>
                </p>
            )}
            {loading && <Loading />}
            {!isEmailSent && ( // Если письмо не отправлено и нет активного таймера, показываем кнопку
                <button
                    className="btn btn-primary ms-2"
                    onClick={handleSendActivationEmail}
                    disabled={isButtonDisabled}
                >
                    Отправить письмо
                </button>
            )}
        </div>
    );
}

export default EmailWarning;
