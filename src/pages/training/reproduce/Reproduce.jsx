import React, { useEffect, useState } from "react";
import Navigation from "../../../common/components/navigation/Navigation"

function Reproduce() {
  return (
    <div class="align-items-center">

        <div class="container navbar-blur sticky-top mb-4 pt-4">
            <span class="block_week py-4">Тренировка на воспроизведение</span>
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

export default Reproduce;
