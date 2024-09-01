import React from 'react';

interface ResultHeaderProps {
    score: number;
}

const ResultHeader: React.FC<ResultHeaderProps> = ({ score }) => {
    return (
        <h1 className="fw-bold mt-3 text-body-emphasis">
            Результат <br /> <b>{score}</b> правильных ответов 🧐
        </h1>
    );
};

export default ResultHeader;