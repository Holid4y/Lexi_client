import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getResponse, activation, host } from "../../../../public/urls";

import Loading from "../../../common/components/Treatment/Loading";
import Header from "../common/Header";


const ActivationEmail = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { uid, token } = useParams();
    
    useEffect(() => {
        handleSetEmail()
    }, []);

    async function handleSetEmail() {
        const url = new URL(host + activation + uid + '/' + token + '/');
        console.log(url)
        setLoading(true)
        const response = await getResponse(url, "GET");

        if (response.ok) {
            console.log('redirect')
        } else {
            const data = await response.json();
            console.log(data)
        }
        setLoading(false)
    };


    return (
        <div className="body-auth">
            <Header />
            
            <main className="form-signin w-100 m-auto">
                <form>
                    <h2 className="mb-4 text-center">Подтверждаем вашу почту...</h2>
                    {loading && <Loading />}
                    {error && <div>{error}</div>}
                </form>
            </main>
        </div>
    );
};

export default ActivationEmail;
