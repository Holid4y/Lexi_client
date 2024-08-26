import "./assets/Landing.css";
import MainBlock from "./components/MainBlock";
import TranslateBlock from "./components/TranslateBlock";
import WordBlock from "./components/WordBlock";
import TestFitst from "./components/TestFitst";
import LastBlock from "./components/LastBlock";
import { Link } from "react-router-dom";

const Instruction = () => {

    return (
        <div class="d-flex text-bg-dark main-box">
            <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" >
                <header class="text-center w-100">
                    <h3 class="float-md-start mb-0">Lexi</h3>
                    <nav class="nav nav-masthead justify-content-center float-md-end">
                        <Link class="nav-link fw-bold py-1 px-0" aria-current="page" to="/landing">Главная</Link>
                        <a class="nav-link fw-bold py-1 px-0" href="#">О нас</a>
                    </nav>
                </header>

                <ul class="nav nav-masthead justify-content-center mb-4 bg-dark mt-2 rounded">
                    <li class="nav-item">
                        <a class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Перевод</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Словарь</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Тест</a>
                    </li>
                </ul>
                
                <main class="px-3 h-100">
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0"><TranslateBlock /></div>
                        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0"><WordBlock /></div>
                        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0"><TestFitst /></div>
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