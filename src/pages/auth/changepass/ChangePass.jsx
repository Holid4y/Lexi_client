import React, { useState } from "react";


import Header from "../common/Header"
import Input from "../common/Input";
import RegistrationSmallBlock from "../register/components/RegistrationSmallBlock";


const ChangePass = () => {

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    return (
        <div className="body-auth">
            <Header />
            <main className="form-signin w-100 m-auto">
                <form>
                    <h2 className="mb-4 text-center">Смена пароля</h2>
                    <div className="mb-4">
                        <Input htmlFor={"password"} label={"Текуций пароль"} type={"password"} value={password} setter={setPassword} />
                        <Input htmlFor={"newPassword"} label={"Новый пароль"} type={"password"} value={newPassword} setter={setNewPassword} />
                        <Input htmlFor={"rePassword"} label={"Повторите пароль"} type={"password"} value={rePassword} setter={setRePassword} />

                        

                        <RegistrationSmallBlock />
                    </div>

                    <div className="d-flex justify-content-center my-4">
                        <button type="button" className="btn btn-primary save-btn py-2 w-75">
                            <span>
                                <b>Изменить пароль</b>
                            </span>
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default ChangePass;
