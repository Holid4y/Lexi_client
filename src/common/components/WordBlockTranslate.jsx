import React, {useEffect} from "react";

import { useDispatch, useSelector } from "react-redux";

function WordBlockTranslate() {

  const { text, part_of_speech, transcription, translations, synonyms, meanings, isVisible, loading, error } = useSelector((state) => state.word);

  console.log(isVisible)
  return (
    <div id="my-block" className={`toggle-block ${isVisible  ? 'show' : ''}`}>
        <div className="px-3 py-2">
            <div>
                <span className="fs-2 pe-3"><b>{text}</b></span>
                <span>[waɪt] прил </span>
            </div>
            <span>
                <b>Белый</b>
                <input className="form-check-input" type="checkbox" value="" />
            </span>
            <hr />
            <span>следить, увидеть, видеть, понаблюдать, смотреть, рассматривать, пронаблюдать, соблюдать, придерживаться, соблюсти, следовать, прослеживать, проследить, блюсти</span>
            <hr />
            <span>watch, see, keep watch, notice, note, follow, adhere, keep, trace</span>
        </div>
    </div>
  );
}

export default WordBlockTranslate;
