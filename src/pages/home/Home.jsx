import React, { useEffect, useState } from "react";

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

            <a href="#">
                <div class="card text-end mb-4 w-100 bg-card-dark">
                    <div class="card-body">
                        <h4 class="card-title w-75 text-start">Тренировка слов на сегодня</h4>
                        <h1 class="book-text">34</h1>
                        <p class="card-text">слова на повторение</p>
                    </div>
                </div>
            </a>

            <a href="#">
                <div class="card text-end mb-4 w-100 bg-card-dark">
                    <div class="card-body">
                        <h4 class="card-title w-75 text-start">Книги и тексты</h4>
                        <p class="card-text w-75 text-start">Читайте книги и тексты. <br/> Добавляйте новые слова в свой словарь</p>
                        <p class="card-text">Читать больше ›</p>
                    </div>
                </div>
            </a>

            <div class="row">
                <div class="col-6">
                    <a href="#">
                        <div class="card position-relative bg-card-dark">
                            <div class="card-body">
                                <h4 class="card-title w-80 text-start py-4">Работа <br/> над ошибками</h4>
                            </div>
                            <span class="position-absolute top-0 start-100 translate-middle badge-error">5</span>
                        </div>
                    </a>
                </div>
                <div class="col-6 d-flex flex-column justify-content-between">
                    <a href="#">
                        <div class="card position-relative bg-card-dark">
                            <div class="card-body text-center">
                                <img src="/assets/images/statistic.svg" alt="" />
                            </div>
                            <span class="position-absolute top-0 start-90 translate-middle badge-seccses">15</span>
                        </div>
                    </a>
                    <a href="#">
                        <div class="card mt-auto bg-card-dark">
                            <div class="card-body text-center">
                                <img src="/assets/images/books.svg" alt="" />
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </main>
    </div>
  );
}

export default Home;
