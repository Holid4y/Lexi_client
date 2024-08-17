import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { throwUser } from "../../../common/reducers/userSlice";
import { host, reset_password_confirm, getResponse } from "../../../../public/urls";


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
        <div className="body-auth position-relative">
            <Header />
            <main className="form-signin w-100 m-auto">
                <form>
                    <h2 className="my-5 text-center">Востановление пароля</h2>
                    <div className="mb-4">
                        <Input htmlFor={"newPassword"} label={"Новый пароль"} type={"password"} value={newPassword} setter={setNewPassword} />
                        <Input htmlFor={"rePassword"} label={"Повторите пароль"} type={"password"} value={rePassword} setter={setRePassword} />

                        <RegistrationSmallBlock />
                    </div>

                    {loading && <Loading />}
                    {message && (
                        <div className="alert alert-success">
                            {message}
                        </div>
                    )}

                    <SubmitButton text={'Изменить пароль'} handle={handleSubmit} />
                </form>
            </main>
        </div>
    );
};

export default ForgotPass;