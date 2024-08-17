import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { host, changePassword, getResponse } from "../../../../public/urls";
import { throwUser } from "../../../common/reducers/userSlice";

import Header from "../common/Header"
import Input from "../common/Input";
import Loading from "../../../common/components/Treatment/Loading";

import SubmitButton from "../common/SubmitButton";

const ChangePass = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit() {
        const url = new URL(host + changePassword);
        const body = {
            new_password: newPassword,
            re_new_password: rePassword,
            current_password: password
        }
        const bodyString = JSON.stringify(body);
        setLoading(true)

        const response = await getResponse(url, "POST", bodyString);

        if (response.ok) {
            doLogout()
        } else {
            const data = await response.json();
            setMessage(JSON.stringify(data));
            setLoading(false)
        }
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
                    <h2 className="my-5 text-center">Смена пароля</h2>
                    <div className="mb-4">
                        <Input htmlFor={"password"} label={"Текуций пароль"} type={"password"} value={password} setter={setPassword} />
                        <Input htmlFor={"newPassword"} label={"Новый пароль"} type={"password"} value={newPassword} setter={setNewPassword} />
                        <Input htmlFor={"rePassword"} label={"Повторите пароль"} type={"password"} value={rePassword} setter={setRePassword} />

                        

                        <small>После изменения пароля необходимо войди в аккаунт заново!</small>
                        <Link to="/send-reset-password">
                            <small className="link-color"> / Забыл пароль</small>
                        </Link>
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

export default ChangePass;
