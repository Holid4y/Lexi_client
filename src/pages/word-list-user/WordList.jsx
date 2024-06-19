import React, { useState, useEffect } from "react";

import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

import { useDispatch, useSelector } from "react-redux";
import { fetchVocabulary } from "../../common/reducers/vocabularySlice";

import Header from "./components/Header";
import Block from "./components/Block";

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
      <Header />

      <main className="container px-4">
        <div className="row row-cols-1 row-cols-md-2 g-3 position-relative">
          {(words && words
            .map((word, index) => (
                  <Block 
                  word={word.word} 
                  key={index} 
                  index={index} 
                  toggleCardBody={toggleCardBody}
                  visibleCardBodies={visibleCardBodies}
                  />
              ))) ||
              (loading ? 'loading...' : <p>Error: {error}</p>)}
        </div>
      </main>
    </div>
  );
}

export default WordList;
