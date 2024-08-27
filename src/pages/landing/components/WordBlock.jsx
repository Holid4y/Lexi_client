import React from 'react';

const WordBlock = () => {
    const words = [
        { word: 'apple', transcription: '[ˈæp.l̩]', level: 1 },
        { word: 'banana', transcription: '[bəˈnæn.ə]', level: 2 },
        { word: 'cherry', transcription: '[ˈtʃer.i]', level: 1 },
        { word: 'date', transcription: '[deɪt]', level: 3 },
        { word: 'elderberry', transcription: '[ˈɛl.dərˌbɛr.i]', level: 1 },
        { word: 'fig', transcription: '[fɪɡ]', level: 2 }
    ];

    return (
        <div className='container'>
            <div className="row flex-lg-row-reverse align-items-center g-2">
                <ol className="list-group list-group-numbered">
                    <li className="list-group-item bg-transparent">Добавляйте новые слова к себе в словарь, <b>Lexi</b> позаботится об их повторении</li>
                </ol>
                <h1 className="fw-bold text-body-emphasis mt-3 text-center">Пример</h1>
                <div className="col-12 d-flex justify-content-center">
                    <div className="row row-cols-2 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
                        {words.map((wordObj, index) => (
                            <div key={index} className="col animated-card-scale">
                                <div role="button">
                                    <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                        <h4 className="text-center pb-0 mb-0">{wordObj.word}</h4>
                                        <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                            <span className="d-block">{wordObj.transcription}</span>
                                        </div>
                                        <div className="card_block_lvl">
                                            <p className="card_block_lvl_span">{`${wordObj.level} lvl`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WordBlock;
