import React from 'react';
import { useSelector } from 'react-redux';

function MeaningsList() {
    const { meanings } = useSelector((state) => state.word);

    function isExist() {
        return meanings.length > 0;
    }

    const MeaningsView = (
        <div>
            <hr />
            <b>Значения:</b>
            <br />
            {meanings.map((meaning, index) => (
                <span className="pe-2 text-break word-for-text" key={index}>
                    {meaning.text}
                </span>
            ))}
        </div>
    );

    return <>{isExist() && MeaningsView}</>;
}

export default MeaningsList;
