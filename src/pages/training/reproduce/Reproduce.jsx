import React, { useEffect, useState } from "react";
import Navigation from "../../../common/components/navigation/Navigation"

function Reproduce() {
  return (
    <div className="align-items-center">

        <div className="container navbar-blur sticky-top mb-4 pt-4">
            <span className="block_week py-4">Тренировка на воспроизведение</span>
        </div>

        <main className="container px-4">
            <a href="#">
                <div className="card text-end mb-4 w-100 bg-card-dark">
                    <div className="card-body">
                        <h4 className="card-title w-75 text-start">Тренировка слов на сегодня</h4>
                        <h1 className="book-text">34</h1>
                        <p className="card-text">слова на повторение</p>
                    </div>
                </div>
            </a>

            <a href="#">
                <div className="card text-end mb-4 w-100 bg-card-dark">
                    <div className="card-body">
                        <h4 className="card-title w-75 text-start">Книги и тексты</h4>
                        <p className="card-text w-75 text-start">Читайте книги и тексты. <br/> Добавляйте новые слова в свой словарь</p>
                        <p className="card-text">Читать больше ›</p>
                    </div>
                </div>
            </a>

            <div className="row mb-4">
                <a className="col-6" href="#">
                    <div className="card bg-card-dark">
                        <div className="card-body text-center py-4-5">
                            <img src="/assets/images/statistic.svg" height={"40px"} alt="" />
                        </div>
                    </div>
                </a>
                <a className="col-6" href="#">
                    <div className="card position-relative bg-card-dark">
                        <div className="card-body text-center py-4-5">
                            <img src="/assets/images/books.svg" height={"40px"} alt="" />
                        </div>
                        <span className="position-absolute top-0 start-90 translate-middle badge-seccses">15</span>
                    </div>
                </a>
            </div>
            <div className="row">
                <a className="col-6" href="#">
                    <div className="card bg-card-dark">
                        <div className="card-body text-center py-4-5">
                            <img src="/assets/images/statistic.svg" height={"40px"} alt="" />
                        </div>
                    </div>
                </a>
                <a className="col-6" href="#">
                    <div className="card position-relative bg-card-dark">
                        <div className="card-body text-center py-4-5">
                            <img src="/assets/images/books.svg" height={"40px"} alt="" />
                        </div>
                        <span className="position-absolute top-0 start-90 translate-middle badge-seccses">17</span>
                    </div>
                </a>
            </div>
        </main>
        <Navigation />
    </div>
  );
}

export default Reproduce;
