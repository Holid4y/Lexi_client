import React from 'react';

const WordBlock = () => {
    const words = [
        { word: 'apple', transcription: '[ˈæp.l̩]', level: 1, part_of_speech: 'нар' },
        { word: 'banana', transcription: '[bəˈnæn.ə]', level: 2, part_of_speech: 'сущ' },
        { word: 'cherry', transcription: '[ˈtʃer.i]', level: 1, part_of_speech: 'гл' },
        { word: 'date', transcription: '[deɪt]', level: 3, part_of_speech: 'прил' },
        { word: 'elderberry', transcription: '[ˈɛl.dərˌbɛr.i]', level: 1, part_of_speech: 'сущ' },
        { word: 'fig', transcription: '[fɪɡ]', level: 2, part_of_speech: 'сущ' }
    ];

    return (
        <div className='container'>
            <div className="row flex-lg-row-reverse align-items-center g-2">
                <ol className="list-group list-group-numbered">
                    <li className="list-group-item bg-transparent">Добавляйте новые слова к себе в словарь, <b>Lexi</b> позаботится об их повторении</li>
                </ol>
                <h1 className="fw-bold text-body-emphasis mt-3 text-center mb-3">Пример</h1>
                <div className="col-12 d-flex justify-content-center w-100">
                    <div className="row row-cols-2 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
                        {words.map((wordObj, index) => (
                            <div key={index} className="col">
                                <div role="button" className="position-relative w-100">
                                    <div className="card card-btn statistic-block d-flex flex-column justify-content-center align-items-center position-relative">
                                        <h4 className="text-center pb-0 mb-0">{wordObj.word}</h4>
                                        {/* <span className="text-center p-0 text-warning">{wordObj.transcription}</span> */}
                                        <div className="word_transcription p-0 m-0 w-100 text-center">
                                            <span className='w-100'>[{wordObj.transcription}]</span>
                                        </div>
                                        <div className="card-left">
                                            <div className="card_block_lvl">
                                                <p className="card_block_lvl_span">
                                                    <b>{`${wordObj.level} lvl`}</b>
                                                </p>
                                            </div>
                                            <div>
                                                <span className="ps-2">{wordObj.part_of_speech}</span>
                                            </div>
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
