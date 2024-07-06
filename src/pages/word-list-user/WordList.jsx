import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVocabulary } from "../../common/reducers/vocabularySlice";
import Block from "./components/Block";
import SVG from "../../common/components/Icons/SVG";
import Headers from "../../common/components/Headers/Header";
import Loading from "../../common/components/Treatment/Loading";
import Errors from "../../common/components/Treatment/Errors";

function WordList() {
    const dispatch = useDispatch();
    const { words, loading, error } = useSelector((state) => state.vocabulary);
    useEffect(() => {
        dispatch(fetchVocabulary());
    }, [dispatch]);

    const Header = <Headers title="Все слова"/>
    const LoadingView = <Loading/>
    const ErrorView = <Errors error={error} />

    return (
        <div className="align-items-center">
            {Header}
            {loading ? ( LoadingView ) : (
                <main className="container pb-5">
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
                        {(words && words.results.map((word, index) => <Block pk={word.pk} word={word.word} key={index} />)) || (loading ? LoadingView : ErrorView)}
                    </div>
                </main>
            )}
        </div>
    );
}

export default WordList;
