import React from 'react';

const TestSecondary = () => {
    return (
        <div className='container'>
            <div className="d-none d-lg-block">
                <div class="row align-items-center g-2 py-5 text-end">
                    <div class="col-12 col-sm-7 col-lg-4 d-flex justify-content-center">
                        <video className="w-100 rounded" autoplay="True" muted>
                            {/* <source src={video_src_test1} type="video/mp4" /> */}
                        </video>
                        <video className="w-100 rounded" autoplay="True" muted>
                            {/* <source src={video_src_test2} type="video/mp4" /> */}
                        </video>
                    </div>
                    <div class="col-lg-8">
                        <h1 class="display-5 fw-bold text-body-emphasis mb-3">Тестирование</h1>
                        <p class="lead">Слова автоматически будут Проходите различные тесты, чтобы закрепить свои знания.</p>
                    </div>
                </div>
            </div>
            <div className="d-block d-lg-none">
                <div class="row align-items-center g-2 py-5">
                    <div class="col-lg-8">
                        <h1 class="display-2 fw-bold text-body-emphasis mb-3 text-center">Тестирование на узнаваемость</h1>
                        <p class="lead">Тесты основаны на словах, которые вы добавили в свой словарь. Проходите тесты, чтобы закрепить свои знания.</p>
                    </div>
                    <div class="col-12">
                        <div>
                            <p className="text-center my-3 mb-4">
                                <b className="fs-2">1</b> <small className="mx-2 pt-1">из</small> <b className="fs-2">5</b>
                            </p>
                            <div className="card statistic mb-5 pt-4">
                                <h4 className="text-center p-2 unselect">Белый</h4>
                                <span className="fs-6 ms-1">L1</span>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-center mb-3">Напишите ответ</h3>
                                <div>
                                    <input type="text" className="form-control py-2-5 mb-3" placeholder="Ваш ответ ..." />
                                </div>
                                <button type="text" className="form-control p-0 py-2 disabled placeholder position-relative h-65">
                                    <small className="small-text-hint top-50 start-50 translate-middle w-100 text-center ps-3">Нажмите, если затрудняетесь ответить</small>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestSecondary;