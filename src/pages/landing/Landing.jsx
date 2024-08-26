import "./assets/Landing.css"
import { Link } from "react-router-dom";

const Landing = () => {

    return (
        <div class="d-flex text-center text-bg-dark main-box">
            <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" >
                <header class="mb-auto">
                    <div>
                    <h3 class="float-md-start mb-0">Lexi</h3>
                    <nav class="nav nav-masthead justify-content-center float-md-end">
                        <a class="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Главная</a>
                        <a class="nav-link fw-bold py-1 px-0" href="#">О нас</a>
                    </nav>
                    </div>
                </header>

                <main class="px-3">
                    <h1 class="display-2 text-center fw-bold text-body-emphasis mt-5">Изучай <span className="text-primary">English</span> по-новому</h1>
                    <p class="lead my-4 d-none d-md-block">Чтение — это лишь начало! Добавляйте новые слова в свой личный словарь, проверяйте знания с помощью увлекательных тестов и отслеживайте свой прогресс. Учитесь с удовольствием, шаг за шагом приближаясь к свободному владению английским языком.</p>
                    <p class="lead mt-5">
                        <Link to="/register" class="btn btn-lg btn-light fw-bold border-white bg-white w-50">Начать</Link>
                    </p>
                </main>

                <footer class="mt-auto text-white-50">
                    <p>Cover template for <a href="https://getbootstrap.com/" class="text-white">Bootstrap</a>, by <a href="https://twitter.com/mdo" class="text-white">@mdo</a>.</p>
                </footer>
            </div>
        </div>
    );
};

export default Landing;
