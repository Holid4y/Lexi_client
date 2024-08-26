import React from 'react';
import SVG from "../../../common/components/Icons/SVG";
import { Link } from "react-router-dom";

const MainBlock = () => {
    return (
        <div class='container'>
            <div class="row flex-lg-row-reverse align-items-center g-2 py-5 px-4">
                <div class="row flex-lg-row-reverse align-items-center g-3 py-4 px-4">
                    <SVG name="LogoSM" />
                    <h1 class="display-2 text-center fw-bold text-body-emphasis mb-5 mt-5">Изучай английский легко и интересно!</h1>
                    <div className='d-flex justify-content-center'>
                        <Link to="/register" class="btn btn-primary btn-lg px-4">Зарегистрироваться</Link>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Link to="/login" class="btn btn-outline-primary btn-lg px-4">Войти</Link>
                    </div>
                    <button type="button" class="btn btn-sm px-4 mt-5">
                        <span>Попробовать</span><br />
                        <span><SVG name="arrow_down" /></span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainBlock;