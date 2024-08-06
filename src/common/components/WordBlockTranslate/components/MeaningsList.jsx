import React from 'react';
import { useSelector } from 'react-redux';

function MeaningsList() {
    const { meanings } = useSelector((state) => state.word);

    return (
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
}

export default MeaningsList;
