import React from "react";

import SVG from "../../../../common/components/Icons/SVG"


function TranslationButton({ handleTranslate }) {


    return (
        <div className="translation-button" onClick={handleTranslate}>
            <SVG name={"translate"} />
        </div>
    );
}

export default TranslationButton;
