import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings, fetchPutSettings } from "../../common/reducers/userSlice";
import { setTheme } from "../../common/reducers/themeSlice";
import { renderResponse } from "../../../public/urls";

function Profile() {
    const dispatch = useDispatch();

    const { username, email, activated_email, number_of_false_set, dark_theme, levels, loading, error, putLoading, putError } = useSelector((state) => state.user);
    const currentTheme = useSelector((state) => state.theme.theme); // Получаем текущую тему из Redux

    const [themeState, setThemeState] = useState(currentTheme);
    const [falseSetLevel, setFalseSetLevel] = useState();

    useEffect(() => {
        if (!username) {
            dispatch(fetchSettings());
        }
    }, [dispatch]);

    useEffect(() => {
        if (number_of_false_set) {
            setFalseSetLevel(number_of_false_set);
        }
    }, [number_of_false_set]);

    useEffect(() => {
        if (currentTheme) {
            setThemeState(currentTheme); // Синхронизация локального состояния с Redux
        }
    }, [currentTheme]);

    const handleThemeChange = (event) => {
        const value = event.target.value;
        setThemeState(value);
        dispatch(setTheme(value));
        localStorage.setItem("theme", value);
    };

    const handleIncrementLevel = () => {
        if (falseSetLevel < 10) {
            setFalseSetLevel(falseSetLevel + 1);
        }
    };

    const handleDecrementLevel = () => {
        if (falseSetLevel > 3) {
            setFalseSetLevel(falseSetLevel - 1);
        }
    };

    function handleSave() {
        const data = {
            username: username,
            email: email,
            activated_email: activated_email,
            settings: {
                levels: levels,
                dark_theme: themeState,
                number_of_false_set: falseSetLevel,
            },
        };
        console.log(data, "input data");
        dispatch(fetchPutSettings(data));
    }

    const Header = 
    <div className="container sticky-top mb-4 pt-2">
        <nav className="navbar dark-nav">
            <div className="container-fluid">
                <span className="navbar-brand">{renderResponse(username, "...", loading, error)}</span>
                <Link className="text-danger" to="/login">
                    Выйти
                </Link>
            </div>
        </nav>
    </div>

    const FormEmail = 
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control py-2-5 mb-2" id="email" defaultValue={renderResponse(email, "", loading, error)} />
        {activated_email ? ("") : (
            <div>
                <span className="text-danger mb-4 ps-2">Почта не подтверждена</span>
                <span className="change pe-2">
                    <a className="btn btn-primary" href="/html/change_pass.html">Подтвердить</a>
                </span>
            </div>
        )}
    </div>

    const FormTheme = 
    <div className="form-control p-0 mb-3 d-flex justify-content-between align-items-center">
        <select className="form-select" value={themeState} onChange={handleThemeChange}>
            <option value="light">Светлая</option>
            <option value="dark">Темная</option>
            <option value="green">Зеленая</option>
            <option value="red">Красная</option>
        </select>
    </div>

    const LinkLvl = 
    <Link to="/lvl-settings" className="form-control mb-3 py-2-5 d-flex justify-content-between">
        <span className="text-start">Настроить уровни словаря</span>
        <span className="text-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
            </svg>
        </span>
    </Link>

    const FormFalset = 
    <div>
        <span className="ps-2">{falseSetLevel === number_of_false_set ? "Кол-во ложных вариантов" : "Кол-во ложных вариантов (не сохранено)"}</span>
        <div className="input-group mb-2">
            <input type="number" className="form-control py-2-5" defaultValue={falseSetLevel} />
            <button className="btn btn-plus-minus box-shadow" onClick={handleIncrementLevel} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
            </button>
            <button className="btn btn-plus-minus box-shadow" onClick={handleDecrementLevel} type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                </svg>
            </button>
        </div>
    </div>

    return (
        <div className="align-items-center">
            {Header}
            <main className="container mb-5">
                {FormEmail}
                {FormTheme}
                {LinkLvl}
                {FormFalset}

                {putLoading ? (
                    <div className="d-flex justify-content-center mt-4">
                        <button type="text" className="btn btn-primary save-btn py-2 w-50" disabled>
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Загрузка...</span>
                            </div>
                        </button>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center my-4">
                        <button type="text" className="btn btn-primary save-btn py-2 w-50" onClick={handleSave}>
                            <span>
                                <b>Сохранить</b>
                            </span>
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Profile;
