// Нижняя навигация
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import WordBlockTranslate from "./WordBlockTranslate";
import SVG from "../components/Icons/SVG";

function Navigation() {
    const { count_word_to_training_recognize, count_word_to_training_reproduce } = useSelector((state) => state.training);
    const location = useLocation();

    const getLinkClass = (path) => {
        return location.pathname === path ? "nav-link active_link" : "nav-link";
    };
    const getTrainingInfo = () => {
        if ((count_word_to_training_recognize != null) & (count_word_to_training_reproduce != null)) {
            return count_word_to_training_recognize + count_word_to_training_reproduce;
        }
    };

    return (
        <nav className="container fixed-bottom py-2">
            <div className="dark-nav">
                <WordBlockTranslate />
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link to="/" className={getLinkClass("/")}>
                            <SVG name="home" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/bookmarks" className={getLinkClass("/bookmarks")}>
                            <SVG name="marklist" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/training" className={`${getLinkClass("/training")} position-relative `}>
                            <small className="position-absolute translate-middle badge badge-position bg-success">{getTrainingInfo()}</small>
                            <SVG name="training" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className={getLinkClass("/profile")}>
                            <SVG name="profile" />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
