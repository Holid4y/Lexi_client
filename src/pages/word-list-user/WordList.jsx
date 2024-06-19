import React, { useState, useEffect } from "react";

import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

import { useDispatch, useSelector } from "react-redux";
import { fetchVocabulary } from "../../common/reducers/vocabularySlice";

function WordList() {
  const dispatch = useDispatch();
  const { words, loading, error } = useSelector((state) => state.vocabulary);
  const [visibleCardBodies, setVisibleCardBodies] = useState([]);

  useEffect(() => {
    const grid = document.querySelector('.row');
    imagesLoaded(grid, () => {
      new Masonry(grid, {
        itemSelector: '.col',
        percentPosition: true,
      });
    });
    dispatch(fetchVocabulary())
  }, [dispatch, visibleCardBodies]);

  const toggleCardBody = (index) => {
    setVisibleCardBodies((prev) => {
      const newVisibleCardBodies = [...prev];
      newVisibleCardBodies[index] = !newVisibleCardBodies[index];
      return newVisibleCardBodies;
    });
  };
  return (
    <div>
        <div className="container sticky-top mb-4 pt-2">
            <nav className="navbar dark-nav">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Мои слова</a>
                </div>
            </nav>
        </div>

        <main className="container px-4">
            <div className="row">
                <div className="col-6 col-md-4">
                    <div className="card statistic mb-4 pt-3" data-bs-toggle="collapse" href="#collapse_Hello" role="button" aria-expanded="false">
                        <h4 className="text-center p-2">Hello</h4>
                        <span>[hellou]</span>
                    </div>
                </div>
                <div className="collapse mb-3" id="collapse_Hello">
                    <div className="card card-body">
                        <h4>Привет (гл.)</h4>
                        <span>следить, увидеть, видеть, понаблюдать, смотреть, рассматривать, пронаблюдать, соблюдать, придерживаться, соблюсти, следовать, прослеживать, проследить, блюсти</span>
                        <hr/>
                        <span>watch, see, keep watch, notice, note, follow, adhere, keep, trace</span>
                        <div className="row mt-3">
                            <div className="col-8"><button className="btn btn-danger">Удалить</button></div>
                            <div className="col-2">lvl - 3</div>
                            <div className="col-2">lvl - 4</div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-4" data-bs-toggle="collapse" href="#collapse_White" role="button" aria-expanded="false">
                    <div className="card statistic mb-4 pt-3">
                        <h4 className="text-center p-2">White</h4>
                        <span>[waɪt]</span>
                    </div>
                </div>
                <div className="collapse mb-3" id="collapse_White">
                    <div className="card card-body">
                        <h4>Белый (прил.)</h4>
                        <span>белый, белоснежный, беленький</span> 
                        <h6>Связанные слова</h6>
                        <span>pale, gray, blank, clean</span>
                        <h6>Антонимы</h6>
                        <span>черный, грязный</span>
                        <hr/>
                        <div className="row mt-3">
                            <div className="col-8"><button className="btn btn-danger">Удалить</button></div>
                            <div className="col-2">lvl - 3</div>
                            <div className="col-2">lvl - 4</div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-4">
                    <div className="card statistic mb-4 pt-3">
                        <h4 className="text-center p-2">Observe</h4>
                        <span>[observi]</span>
                    </div>
                </div>
                <div className="col-6 col-md-4">
                    <div className="card statistic mb-4 pt-3">
                        <h4 className="text-center p-2">Body</h4>
                        <span>[badi]</span>
                    </div>
                </div>
                <div className="col-6 col-md-4">
                    <div className="card statistic mb-4 pt-3">
                        <h4 className="text-center p-2">Time</h4>
                        <span>[waɪt]</span>
                    </div>
                </div>
                <div className="col-6 col-md-4">
                    <div className="card statistic mb-4 pt-3">
                        <h4 className="text-center p-2">Today</h4>
                        <span>[hellou]</span>
                    </div>
                </div>
            </div>

        </main>
    </div>
  );
}

export default WordList;
