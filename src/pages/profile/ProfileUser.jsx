import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Navigation from "../../common/components/Navigation.jsx";

function Profile() {

  return (
    <div className="align-items-center">
        <div class="container sticky-top mb-4 pt-2">
            <nav class="navbar dark-nav">
                <div class="container-fluid">
                <a class="navbar-brand" href="#">dj_banana_hahaha</a>
                <a href="/html/settings.html"><img src="/assets/images/settings.svg" alt=""/></a>
                </div>
            </nav>
        </div>
        <main class="container px-4">
            <div class="mb-3">
                <label for="login" class="form-label">Login</label>
                <input type="text" class="form-control py-2-5" id="login" value="dj_banana_hahaha"/>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control py-2-5 mb-2" id="email" value="dj_banana_hahaha@yandex.ru"/>
                <span class="text-danger mb-4 ps-2">Почта не подтверждена</span><span class="change pe-2"><a class="btn btn-primary" href="/html/change_pass.html">Подтвердить</a></span>
            </div>

            <div class="mb-4">
                <label for="password" class="form-label">Пароль</label>
                <input type="password" class="form-control py-2-5" id="password" disabled value="1234567890"/>
            </div>


            <div class="form-control mb-3 py-2 d-flex justify-content-between align-items-center">
                <span>Темная тема</span>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="themeSwitch"/>
                </div>
            </div>

            <a href="/html/lvl.html" class="form-control mb-3 py-2">
                <span>Настроить уровни словаря</span>
            </a>

            <div class="form-control mb-3 py-2 d-flex justify-content-between align-items-center">
                <span>Продвинутое тестирование</span>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="test_check"/>
                </div>
            </div>
        </main>
    </div>
  );
}

export default Profile;
