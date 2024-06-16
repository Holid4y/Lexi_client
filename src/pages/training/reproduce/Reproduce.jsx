import React, { useEffect, useState } from "react";
import Navigation from "../../../common/components/Navigation"

function Reproduce() {
  return (
    <div className="align-items-center">

        <div className="container navbar-blur sticky-top mb-4 pt-4">
            <span className="block_week py-4"><button className="btn btn-primary me-2 px-3">5</button> | <button className="btn btn-primary ms-2 px-3">10</button></span>
        </div>

        <main className="container px-4">
            <div class="card statistic mb-5 pt-3">
                <h4 class="text-center p-2 fs-2">Hello</h4><span className="fs-6">L2</span>
            </div>

            <div className="mb-4">
                <h3 className="text-center mb-3">Выборы ответа</h3>
                <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off"/>
                <label class="btn btn-outline-primary w-100 mb-3 py-3" for="option1">Дом</label>

                <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off"/>
                <label class="btn btn-outline-primary w-100 mb-3 py-3" for="option2">Плита</label>

                <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off"/>
                <label class="btn btn-outline-primary w-100 mb-3 py-3" for="option3">Белый</label>

                <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off"/>
                <label class="btn btn-outline-primary w-100 mb-3 py-3" for="option4">Ночь</label>
            </div>

            <button className="btn btn-success w-100 py-2">
                Ответить
            </button>
        </main>
    </div>
  );
}

export default Reproduce;
