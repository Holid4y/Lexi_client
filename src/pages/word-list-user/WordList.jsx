import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchVocabulary } from "../../common/reducers/vocabularySlice";

import Header from "./components/Header";
import Block from "./components/Block";

function WordList() {
    const dispatch = useDispatch();
    const { words, loading, error } = useSelector((state) => state.vocabulary);

    useEffect(() => {
        dispatch(fetchVocabulary());
    }, [dispatch]);

    return (
        <div>
            <Header />
            <main className="container">
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                    {(words && words.map((word, index) => <Block word={word.word} key={index} />)) || (loading ? "loading..." : <p>Error: {error}</p>)}
                </div>
            </main>
        </div>
    );
}

export default WordList;
