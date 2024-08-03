import React, { useState } from "react";
import { useSelector } from "react-redux";

import { getResponse, host, resend } from "../../../../../public/urls";

function EmailWarning() {
    const { email } = useSelector((state) => state.user);

    const [message, setMessage] = useState(null);

    async function handleSendActivationEmail() {
        const url = new URL(host + resend);
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
    }

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

            <button className="btn btn-primary ms-2" onClick={handleSendActivationEmail}>
                Отправит письмо
            </button>
        </div>
    );
}

export default EmailWarning;
