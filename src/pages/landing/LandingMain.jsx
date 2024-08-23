import SVG from "../../common/components/Icons/SVG";
import "./assets/Landing.css";
import video_src from "./assets/main.mp4";
import video_src_test1 from "./assets/test1.mp4";
import video_src_test2 from "./assets/test2.mp4";

const Landing = () => {

    return (
        <div>
            <div class="container d-none d-lg-block">
                <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <div class="col-md-3 mb-2 mb-md-0 ps-0 ms-0">
                        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none ps-0 ms-0">
                            <SVG name="logo" />
                        </a>
                    </div>

                    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        {/* <li><a href="#" class="nav-link px-2 link-secondary">Главная</a></li> */}
                    </ul>

                    <div class="col-md-4 text-end">
                        <button type="button" class="btn btn-outline-primary me-2">Вход</button>
                        <button type="button" class="btn btn-primary">Регистрация</button>
                    </div>
                </header>
            </div>

            <div class='container'>
                <div class="d-none d-lg-block">
                    <div class="row flex-lg-row-reverse align-items-center g-2 py-5 px-4">
                        <div class="col-12 col-sm-7 col-lg-5 d-flex justify-content-center">
                            <SVG name="LogoLanding1" />
                        </div>
                        <div class="col-lg-7">
                            <h1 class="display-5 fw-bold text-body-emphasis mb-3">Изучай английский легко и интересно!</h1>
                            <p class="lead">Переводите слова и предложения в одно касание. Учите слова, проходите тесты и следите за прогрессом.</p>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-start mt-3">
                                <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Начать</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-block d-lg-none">
                    <div class="row flex-lg-row-reverse align-items-center g-2 py-5 px-4">
                        <div class="row flex-lg-row-reverse align-items-center g-2 py-4 px-4">
                            <div class="col-12 col-sm-7 col-lg-5 d-flex justify-content-center mb-5">
                                <SVG name="LogoSM" />
                            </div>
                            <div class="col-lg-7">
                                <h1 class="display-2 text-center fw-bold text-body-emphasis mb-3">Изучай английский легко и интересно!</h1>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-start mt-5">
                                    <button type="button" class="btn btn-primary btn-lg px-4">Начать</button>
                                    <button type="button" class="btn btn-outline-primary btn-lg px-4 ">Войти</button>
                                    <button type="button" class="btn btn-sm px-4 mt-4">
                                        <span>Попробовать</span><br />
                                        <span><SVG name="arrow_down" /></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="b-example-divider"></div>

            <div className='container'>
                <div className="d-none d-lg-block">
                    <div class="row flex-lg-row-reverse align-items-center g-2 py-5">
                        <div class="col-12 col-sm-7 col-lg-6 d-flex justify-content-center">
                            <video className="rounded" height={"426px"} loop autoplay="True" muted>
                                <source src={video_src} type="video/mp4" />
                            </video>
                        </div>
                        <div class="col-lg-6">
                            <h1 class="display-5 fw-bold text-body-emphasis mb-3">Перевод слов и предложений</h1>
                            <p class="lead">Просто нажмите на слово для быстрого перевода или удерживайте его для перевода всего предложения.</p>
                        </div>
                    </div>
                </div>
                <div className="d-block d-lg-none">
                    <div class="row flex-lg-row-reverse align-items-center g-2 py-5">
                        <div class="col-12 text-center">
                            <h1 class="display-2 fw-bold text-body-emphasis mb-3">Перевод слов и предложений</h1>
                        </div>
                        <div class="col-12 mt-4">
                            <div className="d-flex"><SVG name="hand" /><p class="lead ms-3">- нажми на слово, для перевода слова</p></div>
                            <div className="d-flex"><SVG name="translate" /><p class="lead ms-3">- нажми на кнопку, для перевода предложения</p></div>
                            <h1 class="display-2 fw-bold text-body-emphasis my-3 text-center ">Пример</h1>

                            <p>
                                <span>“I’m right-handed.”</span><br />
                                <span>The deputy studied him for a moment.</span><br />
                                <span>“It’s on your record.</span><br />
                                <span>I could check.”</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="b-example-divider"></div>

            <div className='container'>
                <div className="d-none d-lg-block">
                    <div class="row flex-lg-row-reverse align-items-center g-2 py-5">
                        <div class="col-12 col-sm-7 col-lg-5 d-flex justify-content-center">
                            <div className="row row-cols-3 g-4 mb-5">
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-7">
                            <h1 class="display-5 fw-bold text-body-emphasis mb-3">Умный словарь</h1>
                            <p class="lead w-75">Добавляйте новые слова к себе в словарь lexi позаботится об их повторении</p>
                        </div>
                    </div>
                </div>
                <div className="d-block d-lg-none">
                    <div class="row flex-lg-row-reverse align-items-center g-2 py-5">
                        <div class="col-lg-7">
                            <h1 class="display-2 fw-bold text-body-emphasis mb-3 text-center">Умный словарь</h1>
                            <p class="lead text-center mt-4 mb-5">Добавляйте новые слова к себе в словарь <b>lexi</b> позаботится об их повторении</p>
                        </div>
                        <div class="col-12 col-sm-7 col-lg-5 d-flex justify-content-center">
                            <div className="row row-cols-3 g-4 mb-5">
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">word</h4>
                                            <span className="text-center p-0">[word]</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
                                            </div>
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    {`1 lvl`} 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="b-example-divider"></div>

            <div className='container'>
                <div className="d-none d-lg-block">
                    <div class="row align-items-center g-2 py-5 text-end">
                        <div class="col-12 col-sm-7 col-lg-4 d-flex justify-content-center">
                            <video className="w-100 rounded" autoplay="True" muted>
                                <source src={video_src_test1} type="video/mp4" />
                            </video>
                            <video className="w-100 rounded" autoplay="True" muted>
                                <source src={video_src_test2} type="video/mp4" />
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
                            <h1 class="display-2 fw-bold text-body-emphasis mb-3 text-center">Тестирование с выбором ответа</h1>
                            <p class="lead">Тесты основаны на словах, которые вы добавили в свой словарь. Проходите тесты, чтобы закрепить свои знания.</p>
                        </div>
                        <div class="col-12">
                            <div>
                                <p className="text-center my-3 mb-4">
                                    <b className="fs-2">1</b> <small className="mx-2 pt-1">из</small> <b className="fs-2">5</b>
                                </p>
                                <div className="card statistic mb-5 pt-4">
                                    <h4 className="text-center p-2 unselect">White</h4>
                                    <span className="fs-6 ms-1">L1</span>
                                </div>
                                <div className="mb-4 d-flex justify-content-center">
                                    <div className="w-75">
                                        <h3 className="text-center mb-3">Варианты ответа</h3>
                                        <div>
                                            <input type="radio" className="btn-check " name="options" id={`option_1`}/>
                                            <label className="btn btn-dark-list position-relative w-100 mb-3 py-3" htmlFor={`option_1`}>Дом</label>
                                        </div>
                                        <div>
                                            <input type="radio" className="btn-check " name="options" id={`option_2`}/>
                                            <label className="btn btn-dark-list position-relative w-100 mb-3 py-3" htmlFor={`option_2`}>Стул</label>
                                        </div>
                                        <div>
                                            <input type="radio" className="btn-check " name="options" id={`option_3`}/>
                                            <label className="btn btn-dark-list position-relative w-100 mb-3 py-3" htmlFor={`option_3`}>Белизна</label>
                                        </div>
                                        <div>
                                            <input type="radio" className="btn-check " name="options" id={`option_4`}/>
                                            <label className="btn btn-dark-list position-relative w-100 mb-3 py-3" htmlFor={`option_4`}>Порт</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="b-example-divider"></div>

            <div className='container'>
                <div className="d-none d-lg-block">
                    <div class="row align-items-center g-2 py-5 text-end">
                        <div class="col-12 col-sm-7 col-lg-4 d-flex justify-content-center">
                            <video className="w-100 rounded" autoplay="True" muted>
                                <source src={video_src_test1} type="video/mp4" />
                            </video>
                            <video className="w-100 rounded" autoplay="True" muted>
                                <source src={video_src_test2} type="video/mp4" />
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

            <div class="b-example-divider"></div>

            <div class='container'>
                <div class="d-none d-lg-block">
                    <div class="row flex-lg-row-reverse align-items-center g-2 py-5 px-4">
                        <div class="col-12 col-sm-7 col-lg-5 d-flex justify-content-center">
                            <SVG name="LogoLanding1" />
                        </div>
                        <div class="col-lg-7">
                            <h1 class="display-5 fw-bold text-body-emphasis mb-3">Изучай английский легко и интересно!</h1>
                            <p class="lead">Переводите слова и предложения в одно касание. Учите слова, проходите тесты и следите за прогрессом.</p>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-start mt-3">
                                <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Начать</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="d-block d-lg-none">
                    <div class="row flex-lg-row-reverse align-items-center g-2 py-5 px-4">
                        <div class="row flex-lg-row-reverse align-items-center g-2 py-4 px-4">
                            <div class="col-12 col-sm-7 col-lg-5 d-flex justify-content-center mb-5">
                                <SVG name="LogoSM" />
                            </div>
                            <div class="col-lg-7">
                                <h1 class="display-2 text-center fw-bold text-body-emphasis mb-3">Изучай английский легко и интересно!</h1>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-start mt-5">
                                    <button type="button" class="btn btn-primary btn-lg px-4">Зарегистрироваться</button>
                                    <button type="button" class="btn btn-outline-primary btn-lg px-4 ">Войти</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Landing;
