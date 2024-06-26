import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { clearScore } from "../../common/reducers/trainingSlice";

function End({ type, count_word_to_training }) {
    const dispatch = useDispatch();
    const { score } = useSelector((state) => state.training);
    function handleAction() {
        // переключить isEnd на false
        dispatch(clearScore())
    }
    console.log(`/training/${type}`)
    return (
        <>
            <div className="align-items-center">
                <div className="container sticky-top mb-3 pt-2">
                    <nav className="navbar dark-nav">
                        <div className="container-fluid">
                        <span className="navbar-brand">Тестирование</span>
                            <Link className="pt-1 color-svg" to="/profile">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                </svg>
                            </Link>
                        </div>
                    </nav>
                </div>
                <div className="container">
                    <div className="text-center mt-5">
                        <div className="px-4 pt-5 mt-5 text-center">
                            <h1 className="fw-bold mt-3 text-body-emphasis">Тест пройден 👍</h1>
                            <div className="col-lg-8 mx-auto">
                                <p className="lead mb-4">
                                    <span>Результат: <b className="btn btn-success">{score}</b></span> <br />
                                </p>
                                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                                    {(count_word_to_training != 0 & count_word_to_training != null) && (
                                        <Link className="btn btn-primary px-4" to={`/training/${type}`} onClick={() => handleAction()}>
                                            Следующий раунд ({count_word_to_training})
                                        </Link>
                                    )}
                                    <Link className="btn btn-primary px-4" to="/training" onClick={() => handleAction()}>
                                        Выйти
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
            
        </>
    );
}

export default End;
