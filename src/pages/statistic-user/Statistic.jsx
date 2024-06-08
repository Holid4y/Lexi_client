import React from "react";
import { Link } from "react-router-dom";

function Statistic() {
  return (
    <div>
        <div class="container sticky-top mb-4 pt-2">
            <nav class="navbar dark-nav">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Статистика</a>
                </div>
            </nav>
        </div>

        <main class="container px-4">

            <h5 class="mb-3">Уровни узнаваемости</h5>
            <div class="row">
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">13</h4>
                        <span>L1</span>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">24</h4>
                        <span>L2</span>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">12</h4>
                        <span>L3</span>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">13</h4>
                        <span>L4</span>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">133</h4>
                        <span>L5</span>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">13</h4>
                        <span>L6</span>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">13</h4>
                        <span>L7</span>
                    </div>
                </div>
            </div>

            <h5 class="mb-3">Уровни воспроизведения</h5>
            <div class="row mb-4">
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">13</h4>
                        <span>L1</span>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">24</h4>
                        <span>L2</span>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">12</h4>
                        <span>L3</span>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">13</h4>
                        <span>L4</span>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">133</h4>
                        <span>L5</span>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">13</h4>
                        <span>L6</span>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="card statistic mb-4">
                        <h4 class="text-center">13</h4>
                        <span>L7</span>
                    </div>
                </div>
            </div>

            <Link to="/lvl-settings" class="form-control mb-4 py-2">
                <span>Настроить уровни словаря</span>
            </Link>

            <Link to="/word-list" class="btn btn-primary w-100 mb-3">
                <span>Все слова</span>
            </Link>
            
        </main>
    </div>
  );
}

export default Statistic;
