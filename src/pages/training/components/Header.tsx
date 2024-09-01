import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SVG from '../../../common/components/Icons/SVG';

import { Round } from "../common/round";

interface HeaderProps {
    roundObj: Round;
}

const Header: React.FC<HeaderProps> = ({ roundObj }) => {

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="container sticky-top mb-3">
            <div className="mt-2">
                <nav className="navbar dark-nav px-3 position-relative">
                    <button className='btn btn-sm d-flex align-items-center ps-0' onClick={handleGoBack}>
                        <SVG name="arrow_left" />
                    </button>
                    <span className="navbar-brand position-absolute top-50 start-50 translate-middle">
                        <b className="fs-3">{roundObj.getCurrentRound() + 1}</b> <small className="mx-2">из</small> <b className="fs-3">{roundObj.getTrainingLength()}</b>
                    </span>
                </nav>
            </div>
        </div>
    );
}

export default Header;
