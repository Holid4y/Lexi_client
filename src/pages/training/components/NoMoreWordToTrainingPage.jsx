import React from "react";

function NoMoreWordToTrainingPage() {
    return (
        <div className="align-items-center">
            <div className="container sticky-top mb-3 pt-2">
                <nav className="navbar dark-nav">
                    <div className="container-fluid">
                        <span className="navbar-brand">Тестирование</span>
                    </div>
                </nav>
            </div>
            <div className="container">
                <div className="text-center mt-5">
                    <div className="px-4 pt-5 mt-5 text-center">
                        <h1 className="fw-bold mt-3 text-body-emphasis">Все слова повторены 🥰</h1>
                        <div className="col-lg-8 mx-auto">
                            <p className="lead mb-4">
                                <br />
                                <span>Читайте больше и добавляйте новые слова</span>
                            </p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                                <Link to="/books" className="btn btn-primary px-4">
                                    Выбрать из списка
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoMoreWordToTrainingPage;
