import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "../../common/reducers/userSlice";
import { toggleTheme } from "../../common/reducers/themeSlice";  // Импортируем экшн для переключения темы
import { renderResponse } from "../../../public/urls";

function Profile() {
  const dispatch = useDispatch();
  const { username, email, activated_email, number_of_false_set, loading, error } = useSelector((state) => state.user);
  const darkTheme = useSelector((state) => state.theme.darkTheme);  // Получаем тему из глобального состояния

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
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

        <span className="ps-2">Кол-во ложных вариантов</span>
        <div className="input-group mb-2">
          <input
            type="number"
            className="form-control py-2"
            value="4"
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
        </div>

        <span className="ps-2">Кол-во слов в раунде</span>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control py-2"
            value="10"
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
        </div>
      </main>
    </div>
  );
}

export default Profile;