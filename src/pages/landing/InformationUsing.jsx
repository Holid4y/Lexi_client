import "./assets/Landing.css";
import MainBlock from "./components/MainBlock";
import TranslateBlock from "./components/TranslateBlock";
import WordBlock from "./components/WordBlock";
import TestFitst from "./components/TestFitst";
import LastBlock from "./components/LastBlock";
import { Link } from "react-router-dom";

const Instruction = () => {

    return (
        <div class="d-flex text-bg-dark main-box" style={{height: "100vh"}}>
            <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" >
                <header class="mb-auto">
                    <div>
                    <h3 class="float-md-start mb-0">Lexi</h3>
                    <nav class="nav nav-masthead justify-content-center float-md-end">
                        <Link class="nav-link fw-bold py-1 px-0" aria-current="page" to="/landing">Главная</Link>
                        <Link class="nav-link fw-bold py-1 px-0 active" to="/instruction">Инструкция</Link>
                        <a class="nav-link fw-bold py-1 px-0" href="#">О нас</a>
                    </nav>
                    </div>
                </header>

                <main class="px-3">
                    <div id="carouselExampleIndicators" class="carousel slide">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item h-100 active">
                                <TranslateBlock />
                            </div>
                            <div class="carousel-item h-100">
                                <WordBlock />
                            </div>
                            <div class="carousel-item h-100">
                                <TestFitst />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </main>

                <footer class="mt-auto text-white-50 text-center">
                    <p>Cover template for <a href="https://getbootstrap.com/" class="text-white">Bootstrap</a>, by <a href="https://twitter.com/mdo" class="text-white">@mdo</a>.</p>
                </footer>
            </div>
        </div>
    );
};

export default Instruction;