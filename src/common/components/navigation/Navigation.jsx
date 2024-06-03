// Нижняя навигация
import React from "react";
import { Link } from 'react-router-dom';

function Navigation() {
  
  return (
    <footer className="container fixed-bottom py-2">
        <div className="dark-nav">
            <div id="my-block" className="toggle-block">
                <div className="px-3 py-2">
                    <div>
                        <span className="fs-2 pe-3"><b>White</b></span>
                        <span>[waɪt] прил </span>
                    </div>
                    <span>
                        <b>Белый</b>
                        <input className="form-check-input" type="checkbox" value="" />
                    </span>
                    <hr />
                    <table className="table table-hover">
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
            <ul className="nav justify-content-center">
                  <li className="nav-item">
                    <Link to="/" className="nav-link"><img src="/assets/images/home.svg" alt="" /></Link>
                    {/* реализовать активацию ссылок классом active_link */}
                  </li>
                  <li className="nav-item">
                    <Link to="/books" className="nav-link"><img src="/assets/images/book_mark.svg" alt="" /></Link>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#"><img src="/assets/images/users.svg" alt="" /></a>
                  </li>
            </ul>
        </div>
    </footer>
  );
}

export default Navigation;
