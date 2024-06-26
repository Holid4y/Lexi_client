import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVocabulary } from "../../common/reducers/vocabularySlice";
import Block from "./components/Block";
import SVG from "../../common/components/Icons/SVG";

function WordList() {
    const dispatch = useDispatch();
    const { words, loading, error } = useSelector((state) => state.vocabulary);

    useEffect(() => {
        dispatch(fetchVocabulary());
    }, [dispatch]);

    return (
        <div className="align-items-center">
            <div className="container sticky-top mb-3 pt-2">
                <nav className="navbar dark-nav">
                    <div className="container-fluid">
                        <span className="navbar-brand">Мои слова</span>
                    </div>
                </nav>
            </div>
            <main className="container">
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                    {(words && words.map((word, index) => <Block word={word.word} key={index} />)) || (loading ? "loading..." : <p>Error: {error}</p>)}
                </div>
            </main>
        </div>
    );
}

export default WordList;
