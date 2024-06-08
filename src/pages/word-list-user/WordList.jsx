import React from "react";

function WordList() {
  return (
    <div>
        <div class="container sticky-top mb-4 pt-2">
            <nav class="navbar dark-nav">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Мои слова</a>
                </div>
            </nav>
        </div>

        <main class="container px-4">
            <div class="row">
                <div class="col-6 col-md-4">
                    <div class="card statistic mb-4 pt-3" data-bs-toggle="collapse" href="#collapse_Hello" role="button" aria-expanded="false">
                        <h4 class="text-center p-2">Hello</h4>
                        <span>[hellou]</span>
                    </div>
                </div>
                <div class="collapse mb-3" id="collapse_Hello">
                    <div class="card card-body">
                        <h4>Привет</h4>
                        <span>следить, увидеть, видеть, понаблюдать, смотреть, рассматривать, пронаблюдать, соблюдать, придерживаться, соблюсти, следовать, прослеживать, проследить, блюсти</span>
                        <hr/>
                        <span>watch, see, keep watch, notice, note, follow, adhere, keep, trace</span>
                        <div class="row mt-3">
                            <div class="col-8"><button class="btn btn-danger">Удалить</button></div>
                            <div class="col-2">lvl - 3</div>
                            <div class="col-2">lvl - 4</div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-4" data-bs-toggle="collapse" href="#collapse_White" role="button" aria-expanded="false">
                    <div class="card statistic mb-4 pt-3">
                        <h4 class="text-center p-2">White</h4>
                        <span>[waɪt]</span>
                    </div>
                </div>
                <div class="collapse mb-3" id="collapse_White">
                    <div class="card card-body">
                        <h4>Белый</h4>
                        <span>следить, увидеть, видеть, понаблюдать, смотреть, рассматривать, пронаблюдать, соблюдать, придерживаться, соблюсти, следовать, прослеживать, проследить, блюсти</span>
                        <hr/>
                        <span>watch, see, keep watch, notice, note, follow, adhere, keep, trace</span>
                        <div class="row mt-3">
                            <div class="col-8"><button class="btn btn-danger">Удалить</button></div>
                            <div class="col-2">lvl - 3</div>
                            <div class="col-2">lvl - 4</div>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-4">
                    <div class="card statistic mb-4 pt-3">
                        <h4 class="text-center p-2">Observe</h4>
                        <span>[observi]</span>
                    </div>
                </div>
                <div class="col-6 col-md-4">
                    <div class="card statistic mb-4 pt-3">
                        <h4 class="text-center p-2">Body</h4>
                        <span>[badi]</span>
                    </div>
                </div>
                <div class="col-6 col-md-4">
                    <div class="card statistic mb-4 pt-3">
                        <h4 class="text-center p-2">Time</h4>
                        <span>[waɪt]</span>
                    </div>
                </div>
                <div class="col-6 col-md-4">
                    <div class="card statistic mb-4 pt-3">
                        <h4 class="text-center p-2">Today</h4>
                        <span>[hellou]</span>
                    </div>
                </div>
            </div>

        </main>
    </div>
  );
}

export default WordList;
