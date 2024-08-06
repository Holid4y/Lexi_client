import React from 'react';
import { useSelector } from 'react-redux';

function SynonymsList() {
    const { synonyms } = useSelector((state) => state.word);

    function isExist() {
        return synonyms.length > 0;
    }

    const SynonymsView = (
        <div>
            <hr />
            <b>Синонимы:</b>
            <br />
            {synonyms.map((synonym, index) => (
                <span className="pe-2 text-break" key={index}>
                    {synonym.text}
                </span>
            ))}
        </div>
    );

    return <>{isExist() && SynonymsView}</>;
}

export default SynonymsList;
