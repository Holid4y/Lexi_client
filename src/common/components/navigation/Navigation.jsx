// Нижняя навигация
import React from "react";
import { Link } from 'react-router-dom';

function Navigation() {
  
  return (
    <footer class="container fixed-bottom py-2">
        <div class="dark-nav">
            <div id="my-block" class="toggle-block">
                <div class="px-3 py-2">
                    <div>
                        <span class="fs-2 pe-3"><b>White</b></span>
                        <span>[waɪt] прил </span>
                    </div>
                    <span>
                        <b>Белый</b>
                        <input class="form-check-input" type="checkbox" value="" />
                    </span>
                    <hr />
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Синонимы</th>
                                <th scope="col">Перевод</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Snowy</th>
                                <td>Белоснежный</td>
                            </tr>
                            <tr>
                                <th scope="row">Whites</th>
                                <td>Беленький</td>
                            </tr>
                            <tr>
                                <th scope="row">Pale</th>
                                <td>Бледный</td>
                            </tr>
                                
                        </tbody>
                    </table>
                </div>
            </div>
            <ul class="nav justify-content-center">
                  <li class="nav-item">
                    <Link to="/" class="nav-link"><img src="/assets/images/home.svg" alt="" /></Link>
                    {/* реализовать активацию ссылок классом active_link */}
                  </li>
                  <li class="nav-item">
                    <Link to="/books" class="nav-link"><img src="/assets/images/book_mark.svg" alt="" /></Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/bookmarks" class="nav-link"><img src="/assets/images/book_test.svg" alt="" /></Link>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#"><img src="/assets/images/book_add.svg" alt="" /></a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" href="#"><img src="/assets/images/users.svg" alt="" /></a>
                  </li>
            </ul>
        </div>
    </footer>
  );
}

export default Navigation;
