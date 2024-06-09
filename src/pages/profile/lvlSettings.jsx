import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchDictionaryLevels } from "../../common/reducers/userSlice";

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

  const renderLevels = () => {
    return (
      <>
        {levels && levels.map((level, index) => (
          <div className="mb-2" key={index}>
            <label htmlFor={`lvl${index}`} className="form-label">
              Уровень {index + 1}
            </label>
            <input
              type="text"
              className="form-control py-2-5"
              id={`lvl${index}`}
              value={level}
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div class="container sticky-top mb-4 pt-2">
        <nav class="navbar dark-nav">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Настройки уровней
            </a>
          </div>
        </nav>
      </div>

      <main class="container px-4">
        <small>
          Для каждого уровня укажите перерыв (в днях) до следующего повторения
        </small>

        {(levels && renderLevels()) ||
          (loading ? <Skeleton /> : <p>Error: {error}</p>)}

        <div class="mt-3">
          <button type="text" class="btn btn-primary py-2 w-100">
            <span>Добавить уровень</span>
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
