import React, { useEffect, useState } from "react";
import Navigation from "../../../common/components/Navigation"

function Recognize() {
  return (
    <div className="align-items-center">

        <p className="text-center my-3 mb-4"><b className="fs-2">3</b> <small className="mx-2 pt-1">из</small> <b className="fs-2">8</b></p>

        <main className="container">
            <div className="card statistic mb-5 pt-4 mx-4">
                <h4 className="text-center p-2">Hello</h4><span className="fs-6 ms-1">L2</span>
            </div>
            <div className="px-5 mb-4">
                <h3 className="text-center mb-3">Выборы ответа</h3>
                <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off"/>
                <label className="btn btn-dark-list w-100 mb-3 py-3" htmlFor="option1">Дом</label>

                <input type="radio" className="btn-check" name="options" id="option2" autoComplete="off"/>
                <label className="btn btn-dark-list w-100 mb-3 py-3" htmlFor="option2">Плита</label>

                <input type="radio" className="btn-check" name="options" id="option3" autoComplete="off"/>
                <label className="btn btn-dark-list w-100 mb-3 py-3" htmlFor="option3">Белый</label>

                <input type="radio" className="btn-check" name="options" id="option4" autoComplete="off"/>
                <label className="btn btn-dark-list w-100 mb-3 py-3" htmlFor="option4">Ночь</label>

            </div>
            <div className="d-flex justify-content-center my-4">
                <button type="text" className="btn btn-primary save-btn py-2 w-50">
                <span><b>Ответить</b></span>
                </button>
            </div>
        </main>
    </div>
  );
}

export default Recognize;
