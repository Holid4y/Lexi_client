import "./assets/Landing.css";
import TranslateBlock from "./components/TranslateBlock";
import WordBlock from "./components/WordBlock";
import TestFitst from "./components/TestFitst";
import { Link } from "react-router-dom";

const Instruction = () => {

    return (
        <div className="d-flex text-bg-dark main-box">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" >
                <header className="container text-center w-100">
                    <h3 className="float-md-start mb-0">Lexi</h3>
                    <nav className="nav nav-masthead justify-content-center float-md-end">
                        <Link className="nav-link fw-bold py-1 px-0" to="/landing">Главная</Link>
                        <Link className="nav-link fw-bold py-1 px-0 active" to="/instruction">Интерактив</Link>
                        <a className="nav-link fw-bold py-1 px-0" href="#">О нас</a>
                    </nav>
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