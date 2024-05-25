// Нижняя навигация
import React from "react";
import { Link } from 'react-router-dom';

function Navigation() {
  
  return (
    <footer class="container fixed-bottom py-2">
        <div class="dark-nav">
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
