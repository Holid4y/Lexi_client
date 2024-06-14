import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchDictionaryLevels, fetchPutDictionaryLevels, updateLevels, addLevel, deleteLevel } from "../../common/reducers/userSlice";

function lvlSettings() {
  const dispatch = useDispatch();
  const {
    levels,
    loading,
    error,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchDictionaryLevels());
  }, [dispatch]);

  function handleLevelChange(index, event) {
    let payload = {
      levels: levels.map((level, i) =>
        i === index ? Math.max(1, parseInt(event.target.value)) : level
      ),
    }
    dispatch(updateLevels(payload));
  }

  function handleAddLevel() {
    const lastLevel = levels[levels.length - 1]
    dispatch(addLevel({ level: Math.round(lastLevel * 1.5)}));
  }
  function handleDeleteLevel(targetLevel) {
    dispatch(deleteLevel({ level: targetLevel }));
  }

  function handleSave() {
    dispatch(fetchPutDictionaryLevels(levels))
  }

  const renderLevels = () => {
    return (
      <>
        {levels && levels.map((level, index) => (
          <div className="mb-2" key={index}>
            <label htmlFor={`lvl${index}`} className="form-label">
              Уровень {index + 1}
            </label>
            {index >= 4 && <button onClick={() => handleDeleteLevel(index)} type="button">удалить</button>}
            <input
              type="number"
              className="form-control py-2-5"
              id={`lvl${index}`}
              value={level}
              onChange={(event) => handleLevelChange(index, event)}
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="container sticky-top mb-4 pt-2">
        <nav className="navbar dark-nav">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Настройки уровней
            </a>
          </div>
        </nav>
      </div>

      <main className="container px-4">
        <small>
          Для каждого уровня укажите перерыв (в днях) до следующего повторения
        </small>

        {(levels && renderLevels()) ||
          (loading ? <p>Loading...</p>: <p>Error: {error}</p>)}
        <div className="mt-3">
          <button type="text" className="btn btn-primary py-2 w-100" onClick={handleAddLevel}>
            <span>Добавить уровень</span>
          </button>
        </div>
        <div className="mt-3">
          {levels && loading ? (
            <small className="bg-success">сохранение</small>
          ) : null}
          <button type="text" className="btn btn-primary py-2 w-100" onClick={handleSave}>
            <span>Сохранить</span>
          </button>
        </div>
        <small>
          если слово на последнем уровне, то дни будут добавляться одни и те же
        </small>
      </main>
    </div>
  );
}

export default lvlSettings;
