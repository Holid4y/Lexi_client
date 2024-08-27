import "./assets/Landing.css";
import TranslateBlock from "./components/TranslateBlock";
import WordBlock from "./components/WordBlock";
import TestFitst from "./components/TestFitst";
import { Link } from "react-router-dom";

const Instruction = () => {

    return (
        <div className="d-flex text-bg-dark main-box">
            <div className="container d-flex w-100 h-100 p-3 mx-auto flex-column" >
                <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between mb-auto">
                    <div class="col-md-4 mb-2 mb-md-0 d-none d-md-block">
                        <h3 className="float-md-start mb-0">Lexi</h3>
                    </div>

                    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/landing" class="nav-link px-2 link-secondary">Главная</Link></li>
                        <li><Link to="/instruction" class="nav-link px-2 ">Интерактив</Link></li>
                        <li><Link to="/about" class="nav-link px-2 link-secondary">О нас</Link></li>
                    </ul>

                    <div class="col-md-4 text-end">
                        <Link to="/login" class="btn btn-outline-primary me-2">Вход</Link>
                        <Link to="/register" class="btn btn-primary">Регистрация</Link>
                    </div>
                </header>

                <hr className="container w-100" />
                <ul className="nav nav-masthead justify-content-center mb-4">
                    <li className="nav-item">
                        <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Перевод</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Словарь</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Тест</a>
                    </li>
                </ul>
                
                
                <main className="px-3 h-100">
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0"><TranslateBlock /></div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0"><WordBlock /></div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0"><TestFitst /></div>
                    </div>
                </main>

                <footer className="mt-auto text-white-50 text-center">
                    <p>Cover template for <a href="https://getbootstrap.com/" className="text-white">Bootstrap</a>, by <a href="https://twitter.com/mdo" className="text-white">@mdo</a>.</p>
                </footer>
            </div>
        </div>
    );
};

export default Instruction;