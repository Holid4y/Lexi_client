import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getResponse, host, resend } from "../../../../../../public/urls";
import Timer from "./Timer";
import Loading from "../../../../../common/components/Treatment/Loading";

function EmailWarning() {
    const { email } = useSelector((state) => state.user);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSendActivationEmail() {
        const url = new URL(host + resend);
        const body = { email: email };
        const bodyString = JSON.stringify(body);

        setLoading(true);
        setIsButtonDisabled(true);

        const response = await getResponse(url, "POST", bodyString);
        if (response.ok) {
            setMessage("Письмо отправлено, подтвердите его.");
            startTimer();
            setLoading(false);
        } else if (response.status == 400) {
            const data = await response.json();
            setMessage(data);
            setLoading(false);
        }
    }

    const startTimer = () => {
        setIsButtonDisabled(true);
        setMessage("");
    };

    const handleTimerEnd = () => {
        setIsButtonDisabled(false);
        setMessage("");
    };

    return (
        <div className="d-flex justify-content-between mb-3">
            {message ? (
                <div className="alert alert-success">{message}</div>
            ) : (
                <p className="pt-2">
                    <small className="me-2 badge bg-warning text-dark">!</small>
                    <span>Ваша почта не подтверждена</span>
                </p>
            )}
            {loading && <Loading />}
            {isButtonDisabled && <Timer duration={60} onTimerEnd={handleTimerEnd} />}
            <button className="btn btn-primary ms-2" onClick={handleSendActivationEmail} disabled={isButtonDisabled}>
                Отправит письмо
            </button>
        </div>
    );
}

export default EmailWarning;
