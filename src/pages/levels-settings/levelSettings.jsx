// LevelSettings.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings, fetchPutSettings } from "../../common/reducers/userSlice";

import Loading from "../../common/components/Treatment/Loading";
import Errors from "../../common/components/Treatment/Errors";

import Header from "./components/Header";
import LevelList from "./components/LevelList";
import AddLevelButton from "./components/AddLevelButton";

function LevelSettings() {
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
    return (
        <div className="align-items-center">
            <Header putLoading={putLoading} hasChanges={hasChanges} handleSave={handleSave} />
            {loading ? (
                <Loading />
            ) : (
                <main className="container pb-5">
                    <div className="my-3">
                        <small className="ps-2">Для каждого уровня укажите перерыв (в днях) до следующего повторения</small>
                    </div>

                    {(levels && (
                        <LevelList
                            levels={levelsState}
                            handleIncrementLevel={handleIncrementLevel}
                            handleDecrementLevel={handleDecrementLevel}
                            handleDeleteLevel={handleDeleteLevel}
                        />
                    )) ||
                        (loading ? <Loading /> : <Errors error={error} />)}
                    <div className="my-3">
                        <AddLevelButton handleAddLevel={handleAddLevel} />
                        <small>При необходимости, добавьте уровни</small>
                    </div>
                </main>
            )}
        </div>
    );
}

export default LevelSettings;
