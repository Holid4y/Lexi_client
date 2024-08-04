import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { host, changePassword, getResponse } from "../../../../../public/urls";
import { throwUser } from "../../../../common/reducers/userSlice";


import Input from "./Input";
import Loading from "../../../../common/components/Treatment/Loading";

import SubmitButton from "./SubmitButton";

const UserEmail = () => {
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
        <div>
            <button type="button" className="form-control mb-3 py-2-5 d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#changepass">
                <span className="text-start">Изменить пароль</span>
                <span className="text-end">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                    </svg>
                </span>
            </button>

            <div class="modal fade" id="changepass" tabindex="-1" aria-labelledby="changepassLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="changepassLabel">Смена пароля</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div className="my-4">
                                    <Input htmlFor={"password"} label={"Текуций пароль"} type={"password"} value={password} setter={setPassword} />
                                    <Input htmlFor={"newPassword"} label={"Новый пароль"} type={"password"} value={newPassword} setter={setNewPassword} />
                                    <Input htmlFor={"rePassword"} label={"Повторите пароль"} type={"password"} value={rePassword} setter={setRePassword} />
                                    <small>После изменения пароля необходимо войди в аккаунт заново.</small>
                                </div>
                                {loading && <Loading />}
                                {message && (
                                    <div className="alert alert-success">
                                        {message}
                                    </div>
                                )}
                                <SubmitButton text={'Изменить пароль'} handle={handleSubmit} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserEmail;
