import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWordBlock } from "../../reducers/wordSlice";

import LoadingComponent from "./components/LoadingComponent";
import WordTranslation from "./components/WordTranslation";
import TranslationsList from "./components/TranslationsList";
import SynonymsList from "./components/SynonymsList";
import FormList from "./components/FormList";
import MeaningsList from "./components/MeaningsList";
import NotFound from "./components/NotFound";
import SmallTranslationWord from "./components/SmallTranslationWord";

function WordBlockTranslate() {
    const dispatch = useDispatch();
    const { pk, related_pk, text, translations, isVisible, loading, meanings } = useSelector((state) => state.word);
    const [showSection2, setShowSection2] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            const wordBlock = document.getElementById("wordBlock");
            if (wordBlock && !wordBlock.contains(event.target)) {
                dispatch(toggleWordBlock());
            }
        }

        function toggleBackdrop(visible) {
            if (visible) {
                const backdrop = document.createElement("div");
                backdrop.className = "modal-backdrop fade show";
                backdrop.id = "customBackdrop";
                document.body.appendChild(backdrop);
                document.body.classList.add("no-scroll");
            } else {
                const backdrop = document.getElementById("customBackdrop");
                if (backdrop) {
                    backdrop.remove();
                }
                document.body.classList.remove("no-scroll");
                setShowSection2(false);
            }
        }

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
            toggleBackdrop(true);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            toggleBackdrop(false);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            toggleBackdrop(false);
        };
    }, [isVisible, dispatch]);

    function renderSectionTwo() {
        return (
            <div id="section-2" className="dark-nav mb-2 p-3">
                <TranslationsList />
                <FormList />
                <SynonymsList />
                <MeaningsList meanings={meanings} />
            </div>
        );
    }

    const renderContent = () => {
        if (loading) {
            return <LoadingComponent />;
        }
        if (translations?.length > 0) {
            // Подсчёт активных переводов
            const activeTranslationsCount = related_pk ? related_pk.length : 0;
            return (
                <div>
                    <WordTranslation 
                        text={text} 
                        translation={translations[0]} 
                        showSection2={showSection2} 
                        setShowSection2={setShowSection2}
                        activeTranslationsCount={activeTranslationsCount}
                    />
                    {showSection2 && renderSectionTwo()}
                </div>
            );
        }

        return <NotFound />;
    };

    return (
        <div>
            <div id="wordBlock" className={`toggle-block ${isVisible ? "show" : ""}`}>
                <div id="section-1">{renderContent()}</div>
            </div>
        </div>
    );
}

export default WordBlockTranslate;
