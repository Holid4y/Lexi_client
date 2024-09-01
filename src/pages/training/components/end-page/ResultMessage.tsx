import React from 'react';

interface ResultMessageProps {
    countWordToTraining: number;
}

const ResultMessage: React.FC<ResultMessageProps> = ({ countWordToTraining }) => {
    return (
        <>
            <p className="lead mb-4">Вы можете продолжить прохождение тестов или же выйти</p>
            <p className="lead mb-4">
                Осталось <b>{countWordToTraining}</b> слова на повторение
            </p>
        </>
    );
};

export default ResultMessage;