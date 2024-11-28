import Footer from "../auth/common/Footer";
import "./assets/Landing.css"
import { Link } from "react-router-dom";

const Landing = () => {

    return (
        <div className="d-flex text-center text-bg-dark main-box">
            <div className="container d-flex w-100 h-100 p-3 mx-auto flex-column" >
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between mb-auto">
                    <div className="col-md-4 mb-2 mb-md-0 d-none d-md-block">
                        <h3 className="float-md-start mb-0">Lexi</h3>
                    </div>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/landing" className="nav-link px-2 ">Главная</Link></li>
                        <li><Link to="/instruction" className="nav-link px-2 link-secondary">Интерактив</Link></li>
                        <li><Link to="/about" className="nav-link px-2 link-secondary">О нас</Link></li>
                    </ul>

                    <div className="col-md-4 text-end">
                        <Link to="/login" className="btn btn-outline-primary me-2">Вход</Link>
                        <Link to="/register" className="btn btn-primary">Регистрация</Link>
                    </div>
                </header>

                <main className="container px-3">
                    <h1 className="display-2 text-center fw-bold text-body-emphasis mt-5">Изучай <span className="text-primary">English</span> по-новому</h1>
                    <p className="lead my-4 d-none d-md-block">Чтение — это лишь начало! Добавляйте новые слова в свой личный словарь, проверяйте знания с помощью увлекательных тестов и отслеживайте свой прогресс. Учитесь с удовольствием, шаг за шагом приближаясь к свободному владению английским языком.</p>
                    <p className="lead mt-5">
                        <Link to="/register" className="btn btn-lg btn-light fw-bold border-white bg-white w-50">Начать</Link>
                    </p>
                </main>

                <Footer/>
            </div>
        </div>
    );
};

export default Landing;
