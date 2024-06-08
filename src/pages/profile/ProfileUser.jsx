import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {

  return (
    <div className="align-items-center">
        <div className="container sticky-top mb-4 pt-2">
            <nav className="navbar dark-nav">
                <div className="container-fluid">
                    <span className="navbar-brand">dj_banana_hahaha</span>
                    <Link class="text-danger" to="/login">Выйти</Link>
                </div>
            </nav>
        </div>
        <main className="container px-4">
            <div className="mb-3">
                <label for="login" className="form-label">Login</label>
                <input type="text" className="form-control py-2-5" id="login" value="dj_banana_hahaha"/>
            </div>
            <div className="mb-3">
                <label for="email" className="form-label">Email</label>
                <input type="email" className="form-control py-2-5 mb-2" id="email" value="dj_banana_hahaha@yandex.ru"/>
                <span className="text-danger mb-4 ps-2">Почта не подтверждена</span><span className="change pe-2"><a className="btn btn-primary" href="/html/change_pass.html">Подтвердить</a></span>
            </div>

            <div className="mb-4">
                <label for="password" className="form-label">Пароль</label>
                <input type="password" className="form-control py-2-5" id="password" disabled value="1234567890"/>
            </div>


            <div className="form-control mb-3 py-2 d-flex justify-content-between align-items-center">
                <span>Темная тема</span>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="themeSwitch"/>
                </div>
            </div>

            <Link to="/lvl-settings" className="form-control mb-3 py-2">
                <span>Настроить уровни словаря</span>
            </Link>

            <div className="form-control mb-3 py-2 d-flex justify-content-between align-items-center">
                <span>Продвинутое тестирование</span>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="test_check"/>
                </div>
            </div>
        </main>
    </div>
  );
}

export default Profile;
