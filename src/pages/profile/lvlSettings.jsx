import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings, fetchPutSettings } from "../../common/reducers/userSlice";
import Headers from "../../common/components/Headers/Header";
import Loading from "../../common/components/Treatment/Loading";
import Errors from "../../common/components/Treatment/Errors";

function lvlSettings() {
    const dispatch = useDispatch();
    const { levels, loading, error, putLoading, putError } = useSelector((state) => state.user);
    const [levelsState, setLevelsState] = useState();

    useEffect(() => {
        if (levels) {
            setLevelsState(levels);
        } else {
            dispatch(fetchSettings());
        }
    }, [dispatch, levels]);

    function handleIncrementLevel(index) {
        let payload = levelsState.map((level, i) => (i === index ? level + 1 : level));
        setLevelsState(payload);
    }

    function handleDecrementLevel(index) {
        let payload = levelsState.map((level, i) => (i === index ? Math.max(1, level - 1) : level));
        setLevelsState(payload);
    }

    function handleAddLevel() {
        const lastLevel = levelsState[levelsState.length - 1];
        setLevelsState((levelsState) => [...levelsState, Math.round(lastLevel * 1.5)]);
    }
    function handleDeleteLevel(index) {
        setLevelsState(levelsState.filter((_, i) => i !== index));
    }

    function handleSave() {
        const data = {
            levels: levelsState,
        };
        dispatch(fetchPutSettings(data));
    }

    const hasChanges = JSON.stringify(levelsState) !== JSON.stringify(levels);

    const Header = <div className="container sticky-top mb-4 pt-2">
        <nav className="navbar dark-nav">
            <div className="container-fluid px-1">
                <span className="navbar-brand">Настройки уровней</span>
                {putLoading ? (
                    <button className="btn mx-0 text-success">
                        <span className="visually-hidden">Загрузка...</span>
                    </button>
                ) : hasChanges ? (
                    <button className="btn mx-0 text-success" onClick={handleSave}>
                        Сохранить
                    </button>
                ) : null}
            </div>
        </nav>
    </div>

    const LoadingView = <Loading />;
    const ErrorView = <Errors error={error} />;

    const renderLevels = () => {
        return (
            <div>
                {levelsState &&
                    levelsState.map((level, index) => (
                        <div className="mb-2" key={index}>
                            <label htmlFor={`lvl${index}`} className="form-label">
                                Уровень {index + 1} {levelsState && levelsState[index] == levels[index] ? null : "(не сохранено)"}
                            </label>
                            <div className="input-group mb-3">
                                <input
                                    type="number"
                                    className="form-control py-2-5 fw-bolder ps-3"
                                    id={`lvl${index}`}
                                    value={level}
                                    onChange={(event) => handleLevelChange(index, event)}
                                />
                                <button className="btn btn-plus-minus box-shadow" onClick={() => handleIncrementLevel(index)} type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                </button>
                                <button className="btn btn-plus-minus rounded-end box-shadow" onClick={() => handleDecrementLevel(index)} type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                    </svg>
                                </button>
                                {index >= 4 && (
                                    <div className="ms-2 w-55px">
                                        <button className="btn btn-secondary w-100 h-100" onClick={() => handleDeleteLevel(index)} type="button">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        );
    };

    return (
        <div className="align-items-center">
            {Header}
            {loading ? (
                LoadingView
            ) : (
                <main className="container pb-5">
                    <div className="my-3">
                        <small className="ps-2">Для каждого уровня укажите перерыв (в днях) до следующего повторения</small>
                    </div>

                    {(levels && renderLevels()) || (loading ? LoadingView : ErrorView)}
                    <div className="my-3">
                        <button className="btn btn-secondary w-55px me-2" onClick={handleAddLevel} type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                            </svg>
                        </button>
                        <small>При необходимости, добавьте уровни</small>
                    </div>
                </main>
            )}
        </div>
    );
}

export default lvlSettings;
