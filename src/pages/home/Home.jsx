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
                        <span class="ps-2">Статистика</span>
                        <div class="card mb-4 w-100 border-none card-btn">
                            <h4 class="book-text text-center py-2"><img src="/assets/images/statistic.svg" height={"40px"} alt="" /></h4>
                        </div>
                    </a>
                </div>
                {/* <div class="col-12 col-md-4">
                    <a href="#" class="text-white">
                        <span class="ps-2">Добавить книгу</span>
                        <div class="card mb-4 w-100 border-none card-btn">
                            <h4 class="book-text text-center py-2">+</h4>
                        </div>
                    </a>
                </div> */}
            </div>

            <div className="row g-4">
                <div className="col-12 col-sm-8">
                    <a href="#">
                        <div class="card text-end bg-card-dark">
                            <div class="card-body">
                                <h4 class="card-title text-start"><b>Тренировка слов на сегодня</b></h4>
                                <p class="text-start mb-0">
                                    <span class="book-text pe-1">34</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-music-note" viewBox="0 0 16 16">
                                        <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2"/>
                                        <path fill-rule="evenodd" d="M9 3v10H8V3z"/>
                                        <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5z"/>
                                    </svg>
                                    <span class="book-text ps-4 pe-1">12</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                    </svg>
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-12 col-sm-4  d-flex flex-column justify-content-between">
                    <div class="col-12 ps-0">
                        <Link to="/training/reproduce">
                            <div class="card card-text-lr card-btn overflow-box">
                                <div class="card-body text-start">
                                    <span>Воспроизведение</span>
                                </div>
                                <div class="svg-background">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-headphones" viewBox="0 0 16 16">
                                        <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5"/>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <dir class="col-12 ps-0">
                        <Link to="/training/recognize">
                            <div class="card mt-auto card-text-lr card-btn overflow-box">
                                <div class="card-body text-start">
                                    <span>Узнаваемость</span>
                                </div>
                                <div class="svg-background">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </dir>
                </div>
                
            </div>

            {/* <div className="col-3">
                    <Link to="/test/v1/" class="btn btn-primary">Тест на воспроизведение</Link>
                    <Link to="/test/v2/" class="btn btn-primary">Тест на узнавание</Link>
                </div> */}
            

            <a href="#">
                <div class="card text-end mb-4 w-100 bg-card-dark">
                    <div class="card-body">
                        <h4 class="card-title w-75 text-start"><b>Книги и тексты</b></h4>
                        <p class="card-text w-75 text-start">Читайте книги и тексты. <br/> Добавляйте новые слова в свой словарь</p>
                        <p class="card-text">Читать больше</p>
                    </div>
                </div>
            </a>

            <div class="row mb-4 g-4">
                <a class="col-6 col-md-4" href="#">
                    <div class="card position-relative bg-card-dark card-btn">
                        <div class="card-body text-center py-3">
                            Все книги
                            {/* <img src="/assets/images/books.svg" height={"40px"} alt="" /> */}
                        </div>
                        <span class="position-absolute top-0 start-90 translate-middle badge-seccses">15</span>
                    </div>
                </a>
                <a class="col-6 col-md-4" href="#">
                    <div class="card position-relative bg-card-dark card-btn">
                        <div class="card-body text-center py-3">
                            Все слова
                            {/* <img src="/assets/images/books.svg" height={"40px"} alt="" /> */}
                        </div>
                        <span class="position-absolute top-0 start-90 translate-middle badge-seccses">17</span>
                    </div>
                </a>
                <a class="col-6 col-md-4" href="#">
                    <div class="card bg-card-dark card-btn">
                        <div class="card-body text-center py-3">
                            История
                            {/* <img src="/assets/images/statistic.svg" height={"40px"} alt="" /> */}
                        </div>
                    </div>
                </a>
            </div>
        </main>
        <Navigation />
    </div>
  );
}

export default Home;
