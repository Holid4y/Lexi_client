import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchDictionaryLevels, fetchPutDictionaryLevels, updateLevels, addLevel, deleteLevel } from "../../common/reducers/userSlice";

function lvlSettings() {
  const dispatch = useDispatch();
  const { levels, loading, error, } = useSelector((state) => state.user);

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

  function handleIncrementLevel(index) {
    let payload = {
      levels: levels.map((level, i) =>
        i === index ? level + 1 : level
      ),
    }
    dispatch(updateLevels(payload));
  }

  function handleDecrementLevel(index) {
    let payload = {
      levels: levels.map((level, i) =>
        i === index ? Math.max(1, level - 1) : level
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
              <div className="input-group mb-3">
                  <input
                    type="number"
                    className="form-control py-2-5"
                    id={`lvl${index}`}
                    value={level}
                    onChange={(event) => handleLevelChange(index, event)}
                  />
                  <button className="btn btn-plus-minus" onClick={() => handleIncrementLevel(index)} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                  </button>
                  <button className="btn btn-plus-minus" onClick={() => handleDecrementLevel(index)} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                    </svg>
                  </button>
                  {index >= 4 && 
                  <button className="btn btn-secondary" onClick={() => handleDeleteLevel(index)} type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                    </svg>
                  </button>}
              </div>

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
