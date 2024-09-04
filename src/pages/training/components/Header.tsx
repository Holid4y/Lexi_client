import React from "react";
import { useSelector } from "react-redux";
import { RootState } from '../../../store'; // Импортируйте RootState
import SVG from '../../../common/components/Icons/SVG';

const Header: React.FC = () => {
    // Используем типизацию для состояния
    const { training, round } = useSelector((state: RootState) => state.trainingRound)

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
                        <b className="fs-3">{round + 1}</b> <small className="mx-2">из</small> <b className="fs-3">{training?.length}</b>
                    </span>
                </nav>
            </div>
        </div>
    );
}

export default Header;