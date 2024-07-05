import React from "react";

import SVG from "../../../../common/components/Icons/SVG"


function TranslationButton({ handleTranslate }) {


    return (
        <i className="translation-button" onClick={handleTranslate}>
            <SVG name={"translate"} />
        </i>
    );
}

export default TranslationButton;
