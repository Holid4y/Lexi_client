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
        <div className="row row-cols-1 row-cols-md-2 g-3 position-relative">
          {['Hello', 'White', 'Observe', 'Body', 'Time', 'Today'].map((title, index) => (
            <div className="col" role="button" onClick={() => toggleCardBody(index)} key={index}>
              <div className="card statistic pt-3">
                <h4 className="text-center p-2">{title}</h4>
                <span>[{title.toLowerCase()}]</span>
                <div className={`card-body p-3 collapse text-white ${visibleCardBodies[index] ? 'show' : ''}`}>
                  <p>следить, увидеть, видеть, понаблюдать, смотреть, рассматривать, пронаблюдать, соблюдать, придерживаться, соблюсти, следовать, прослеживать, проследить, блюсти</p>
                  <hr />
                  <p>watch, see, keep watch, notice, note, follow, adhere, keep, trace</p>
                  <button className="btn btn-danger w-100 mt-2">Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default WordList;
