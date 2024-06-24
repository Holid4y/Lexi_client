import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchSettings } from "../../common/reducers/userSlice";
import { fetchPutSettings } from "../../common/reducers/userSlice";

import { setTheme } from "../../common/reducers/themeSlice";  // Импортируем экшн для переключения темы
import { renderResponse } from "../../../public/urls";

function Profile() {
  const dispatch = useDispatch();
  
  const { username, email, activated_email, number_of_false_set, dark_theme, levels, loading, error, putLoading, putError } = useSelector((state) => state.user);
  const darkTheme = useSelector((state) => state.theme.darkTheme);  // Получаем тему из глобального состояния
  
  const [darkThemeState, setDarkThemeState] = useState(darkTheme)
  const [falseSetLevel, setFalseSetLevel] = useState()

  useEffect(() => {
    if (!username){
      dispatch(fetchSettings());
    }
  }, [dispatch]);

  useEffect(() => {
    if (number_of_false_set){
      setFalseSetLevel(number_of_false_set)
    }
    if (darkTheme){
      setDarkThemeState(darkTheme)
    }
  }, [number_of_false_set, darkTheme]);

  const handleThemeChange = () => {
    setDarkThemeState(!darkThemeState)
    dispatch(setTheme(!darkThemeState))
    localStorage.setItem('theme', !darkThemeState ? 'dark' : 'light');
  };

  const handleIncrementLevel = () => {
    if (falseSetLevel < 10) {
      setFalseSetLevel(falseSetLevel + 1);
    }
  }

  const handleDecrementLevel = () => {
    if (falseSetLevel > 3) {
      setFalseSetLevel(falseSetLevel - 1);
    }
  }

  function handleSave() {
    const data = {
      "username": username,
      "email": email,
      "activated_email": activated_email,
      "settings": {
          "levels": levels,
          "dark_theme": darkThemeState,
          "number_of_false_set": falseSetLevel
      }
    }
    console.log(data, 'input data')
    dispatch(fetchPutSettings(data))
  }
  return (
    <div className="align-items-center">
      <div className="container sticky-top mb-4 pt-2">
        <nav className="navbar dark-nav">
          <div className="container-fluid">
            <span className="navbar-brand">{renderResponse(username, '...', loading, error)}</span>
            <Link className="text-danger" to="/login">Выйти</Link>
          </div>
        </nav>
      </div>
      <main className="container">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control py-2-5 mb-2" id="email" defaultValue={renderResponse(email, '', loading, error)}/>
          {activated_email ? (''):(
            <>
            <span className="text-danger mb-4 ps-2">Почта не подтверждена</span>
            <span className="change pe-2">
              <a className="btn btn-primary" href="/html/change_pass.html">Подтвердить</a>
            </span>
            </>)
          }
        </div>

        <div className="form-control mb-3 py-2 d-flex justify-content-between align-items-center">
          <span>{darkThemeState == dark_theme ? ('Темная тема') : ('Темная тема (не сохранено)')}</span>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="themeSwitch" checked={darkThemeState} onChange={handleThemeChange} />
          </div>
        </div>

        <Link to="/lvl-settings" className="form-control mb-3 py-2 d-flex justify-content-between">
          <span className="text-start">Настроить уровни словаря</span>
          <span className="text-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
            </svg>
          </span>
        </Link>

        <span className="ps-2">{falseSetLevel == number_of_false_set ? ('Кол-во ложных вариантов') : ('Кол-во ложных вариантов (не сохранено)')}</span>
        <div className="input-group mb-2">
          <input type="number" className="form-control py-2" defaultValue={falseSetLevel} />
          <button className="btn btn-plus-minus" onClick={() => handleIncrementLevel()} type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
          </button>
          <button className="btn btn-plus-minus" onClick={() => handleDecrementLevel()} type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
            </svg>
          </button>
        </div>

        { putLoading ? (
            <div className="d-flex justify-content-center mt-4">
              <button type="text" className="btn btn-primary save-btn py-2 w-50" disabled>
                <div class="spinner-border spinner-border-sm" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </button>
            </div>
          ) : 
          <div className="d-flex justify-content-center my-4">
            <button type="text" className="btn btn-primary save-btn py-2 w-50" onClick={handleSave}>
              <span><b>Сохранить</b></span>
            </button>
          </div>}

          
          

        {/* <span className="ps-2">Кол-во слов в раунде</span>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control py-2"
            defaultValue="10"
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
        </div> */}
      </main>
    </div>
  );
}

export default Profile;