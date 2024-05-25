import React from "react";



function Navigation() {
  
  return (
    <footer class="container fixed-bottom py-2">
        <div class="dark-nav">
        <ul class="nav justify-content-center">
              <li class="nav-item">
                  <a class="nav-link active_link" href="#"><img src="/assets/images/home.svg" alt="" /></a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#"><img src="/assets/images/book_mark.svg" alt="" /></a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#"><img src="/assets/images/book_test.svg" alt="" /></a>
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
