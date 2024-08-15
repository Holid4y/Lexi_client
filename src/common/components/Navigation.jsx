// Нижняя навигация
import {useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrainingInfo } from "../reducers/training/trainingSlice";
import { isActivatedEmail } from "../../pages/profile/utils/utils";
import WordBlockTranslate from "./WordBlockTranslate/WordBlockTranslate";
import FloatingButtons from "./FloatingButtons"
import SVG from "../components/Icons/SVG";

function Navigation() {
    const dispatch = useDispatch()
    
    const { viewCountSumm } = useSelector((state) => state.training);

    const location = useLocation();

    function isThereProblem() {
        const { activated_email } = useSelector((state) => state.user);
        if (isActivatedEmail(activated_email) == false){
            return true
        } 
        // проблем может быть множество а иконка проблемы одна
        // if (something is problem) {
        //     return true
        // }
    }

    useEffect(() => {
        dispatch(fetchTrainingInfo())
    }, []);

    const getLinkClass = (path) => {
        return location.pathname === path ? "nav-link navigation-custome active_link" : "nav-link navigation-custome";
    };
    const TrainigBadge = viewCountSumm ? <small className="position-absolute translate-middle badge badge-position bg-success">c</small> : null;

    const ProblemBadge = isThereProblem() ? <small className="position-absolute translate-middle badge badge-position bg-warning text-dark">!</small> : null;

    return (
        <nav className="container fixed-bottom py-2">
            <div className="">
                <WordBlockTranslate />
                <ul className="dark-nav nav justify-content-center">
                    <li className="nav-item">
                        <Link to="/" className={getLinkClass("/")}>
                            <SVG name="home" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/word-list" className={getLinkClass("/word-list")}>
                            <SVG name="words" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <FloatingButtons />
                    </li>
                    <li className="nav-item">
                        <Link to="/training" className={`${getLinkClass("/training")} position-relative `}>
                            {TrainigBadge}
                            <SVG name="training" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className={`${getLinkClass("/profile")} position-relative `}>
                            {ProblemBadge}
                            <SVG name="profile" />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
