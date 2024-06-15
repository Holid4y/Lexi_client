import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../../common/reducers/userSlice";

import { renderResponse } from "../../../public/urls";

function Profile() {
  const dispatch = useDispatch();
  const { username, email, activated_email, dark_theme: initialDarkTheme, number_of_false_set, loading, error } = useSelector((state) => state.user);

  const [darkTheme, setDarkTheme] = useState(initialDarkTheme);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setDarkTheme(storedTheme === 'dark');
    } else {
      setDarkTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    const theme = darkTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [darkTheme]);

  const handleThemeChange = () => {
    setDarkTheme(!darkTheme);
    // Здесь можно дергать fetchPatchSettings, если нужно сохранить настройку на сервере
  };

  return (
    <div className="align-items-center">
      <div className="container sticky-top mb-4 pt-2">
        <nav className="navbar dark-nav">
          <div className="container-fluid">
            <span className="navbar-brand">{renderResponse(username, '...', loading, error)}</span>
            <Link className="text-danger" to="/login">
              Выйти
            </Link>
          </div>
        </nav>
      </div>
      <main className="container px-4">
        {/* <div className="mb-3">
          <label htmlFor="login" className="form-label">
            Login
          </label>
          <input
            type="text"
            className="form-control py-2-5"
            id="login"
            value={renderResponse(username, '', loading, error)}
          />
        </div> */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control py-2-5 mb-2"
            id="email"
            value={renderResponse(email, '', loading, error)}
          />
          <span className="text-danger mb-4 ps-2">Почта не подтверждена</span>
          <span className="change pe-2">
            <a className="btn btn-primary" href="/html/change_pass.html">
              Подтвердить
            </a>
          </span>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            className="form-control py-2-5"
            id="password"
            disabled
            value="1234567890"
          />
        </div>

        <div className="form-control mb-3 py-2 d-flex justify-content-between align-items-center">
          <span>Темная тема</span>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="themeSwitch"
              checked={darkTheme}
              onChange={handleThemeChange}
            />
          </div>
        </div>

        <Link to="/lvl-settings" className="form-control mb-3 py-2">
          <span>Настроить уровни словаря</span>
        </Link>

        <div className="form-control mb-3 py-2 d-flex justify-content-between align-items-center">
          <span>Продвинутое тестирование</span>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="test_check"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
