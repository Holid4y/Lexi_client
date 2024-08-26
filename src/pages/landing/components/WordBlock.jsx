import React from 'react';

const WordBlock = () => {
    const words = [
        { word: 'apple', transcription: '[ˈæp.l̩]', level: 1 },
        { word: 'banana', transcription: '[bəˈnæn.ə]', level: 2 },
        { word: 'cherry', transcription: '[ˈtʃer.i]', level: 1 },
        { word: 'date', transcription: '[deɪt]', level: 3 },
        { word: 'elderberry', transcription: '[ˈɛl.dərˌbɛr.i]', level: 1 },
        { word: 'fig', transcription: '[fɪɡ]', level: 2 },
        { word: 'grape', transcription: '[ɡreɪp]', level: 1 },
        { word: 'honeydew', transcription: '[ˈhʌn.i.djuː]', level: 3 },
        { word: 'kiwi', transcription: '[ˈkiː.wi]', level: 2 },
    ];

    return (
        <div className='container'>
            <div>
                <div className="row flex-lg-row-reverse align-items-center g-2 py-5">
                    <div className="col-12">
                        <h1 className="fw-bold text-body-emphasis mb-3 text-center">Умный словарь</h1>
                        <p className="lead text-center mt-4 mb-5">
                            Добавляйте новые слова к себе в словарь, <b>Lexi</b> позаботится об их повторении
                        </p>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <div className="row row-cols-3 g-4 mb-5">
                            {words.map((wordObj, index) => (
                                <div key={index} className="col animated-card-scale">
                                    <div role="button">
                                        <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                            <h4 className="text-center pb-0 mb-0">{wordObj.word}</h4>
                                            <span className="text-center p-0">{wordObj.transcription}</span>
                                            <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                                                <span className="d-block">Слово</span>
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
        </div>
    );
};

export default WordBlock;
