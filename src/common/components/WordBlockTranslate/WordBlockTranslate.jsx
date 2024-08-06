import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleWordBlock } from "../../reducers/wordSlice";

import LoadingComponent from "./components/LoadingComponent";
import WordTranslation from "./components/WordTranslation";
import SynonymsList from "./components/SynonymsList";
import MeaningsList from "./components/MeaningsList";
import NotFound from "./components/NotFound";
import SmallTranslationWord from "./components/SmallTranslationWord";

function WordBlockTranslate() {
    const dispatch = useDispatch();
    const { pk, related_pk, text, translations, isVisible, loading } = useSelector((state) => state.word);
    const [showSection2, setShowSection2] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            const wordBlock = document.getElementById("wordBlock");
            if (wordBlock && !wordBlock.contains(event.target)) {
                dispatch(toggleWordBlock());
            }
        }

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.classList.add("no-scroll");
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.classList.remove("no-scroll");
            setShowSection2(false);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.classList.remove("no-scroll");
        };
    }, [isVisible, dispatch]);

    function renderSectionTwo() {
        return (
            <div id="section-2" className="dark-nav mb-2 p-3">
                {translations.length > 0 && (
                    <div>
                        <b>Переводы:</b>
                        <br />
                        {translations.map(
                            (translation, index) => index !== 0 && <SmallTranslationWord wordPk={pk} related_pk={related_pk} translation={translation} key={index} />
                        )}
                    </div>
                )}
                <SynonymsList />
                <MeaningsList />
            </div>
        );
    }

    const renderContent = () => {
        if (loading) {
            return <LoadingComponent />;
        }

        if (translations?.length > 0) {
            return (
                <div>
                    <WordTranslation 
                        text={text} 
                        translation={translations[0]} 
                        showSection2={showSection2} 
                        setShowSection2={setShowSection2} 
                    />
                    {showSection2 && renderSectionTwo()}
                </div>
            );
        }

        return <NotFound />;
    };

    return (
        <div>
            <div className="modal-backdrop fade show" style={{ display: isVisible ? "block" : "none" }}></div>
            <div id="wordBlock" className={`toggle-block ${isVisible ? "show" : ""}`}>
                <div id="section-1">{renderContent()}</div>
            </div>
        </div>
    );
}

export default WordBlockTranslate;
