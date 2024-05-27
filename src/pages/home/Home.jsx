import React, { useEffect, useState } from "react";
import Navigation from "../../common/components/navigation/Navigation"
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div class="align-items-center">

        <div class="container navbar-blur sticky-top mb-4 pt-4">
            <div class="row row-cols-7 g-2">
                <div class="block_week col bg-danger"><span>пн</span></div>
                <div class="block_week col bg-danger"><span>вт</span></div>
                <div class="block_week col"><span>ср</span></div>
                <div class="block_week col"><span>чт</span></div>
                <div class="block_week col bg-success"><span>пт</span></div>
                <div class="block_week col bg-success"><span>сб</span></div>
                <div class="block_week col"><span>вс</span></div>
            </div>
        </div>

        <main class="container px-4">

            <div class="row">
                <div class="col-6 col-md-4">
                    <span class="ps-2">Количество слов</span>
                    <div class="card mb-4">
                        <h4 class="book-text text-center py-2">136</h4>
                    </div>
                </div>
                <div class="col-6 col-md-4">
                    <span class="ps-2">Всего текстов</span>
                    <div class="card mb-4">
                        <h4 class="book-text text-center py-2">12</h4>
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <a href="#" class="text-white">
                        <span class="ps-2">Добавить книгу</span>
                        <div class="card mb-4 w-100 border-none">
                            <h4 class="book-text text-center py-2">+</h4>
                        </div>
                    </a>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-8 h-100">
                    <a href="#">
                        <div class="card text-end bg-card-dark">
                            <div class="card-body">
                                <h4 class="card-title w-75 text-start">Тренировка слов на сегодня</h4>
                                <p class="text-start mb-0"><span class="book-text">34</span> воспроизведение  <span class="book-text">12</span> написание</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-4 d-flex flex-column justify-content-between">
                    <Link to="/training/reproduce">
                        <div class="card card-text-lr">
                            <div class="card-body text-center">
                                <span>на воспроизведение</span>
                            </div>
                        </div>
                    </Link>
                    <Link to="/training/recognize">
                        <div class="card mt-auto card-text-lr">
                            <div class="card-body text-center">
                                <span>на узнаваемость</span>
                            </div>
                        </div>
                    </Link>
                </div>
                
            </div>

            {/* <div className="col-3">
                    <Link to="/test/v1/" class="btn btn-primary">Тест на воспроизведение</Link>
                    <Link to="/test/v2/" class="btn btn-primary">Тест на узнавание</Link>
                </div> */}
            

            <a href="#">
                <div class="card text-end mb-4 w-100 bg-card-dark">
                    <div class="card-body">
                        <h4 class="card-title w-75 text-start">Книги и тексты</h4>
                        <p class="card-text w-75 text-start">Читайте книги и тексты. <br/> Добавляйте новые слова в свой словарь</p>
                        <p class="card-text">Читать больше ›</p>
                    </div>
                </div>
            </a>

            <div class="row mb-4">
                <a class="col-6" href="#">
                    <div class="card bg-card-dark">
                        <div class="card-body text-center py-4-5">
                            <img src="/assets/images/statistic.svg" height={"40px"} alt="" />
                        </div>
                    </div>
                </a>
                <a class="col-6" href="#">
                    <div class="card position-relative bg-card-dark">
                        <div class="card-body text-center py-4-5">
                            <img src="/assets/images/books.svg" height={"40px"} alt="" />
                        </div>
                        <span class="position-absolute top-0 start-90 translate-middle badge-seccses">15</span>
                    </div>
                </a>
            </div>
            <div class="row">
                <a class="col-6" href="#">
                    <div class="card bg-card-dark">
                        <div class="card-body text-center py-4-5">
                            <img src="/assets/images/statistic.svg" height={"40px"} alt="" />
                        </div>
                    </div>
                </a>
                <a class="col-6" href="#">
                    <div class="card position-relative bg-card-dark">
                        <div class="card-body text-center py-4-5">
                            <img src="/assets/images/books.svg" height={"40px"} alt="" />
                        </div>
                        <span class="position-absolute top-0 start-90 translate-middle badge-seccses">17</span>
                    </div>
                </a>
            </div>
        </main>
        <Navigation />
    </div>
  );
}

export default Home;
