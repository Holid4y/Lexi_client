import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';

import ResultHeader from './ResultHeader';
import ResultMessage from './ResultMessage';
import ActionButtons from './ActionButtons';
import { fetchTrainingInfo } from '../../../../common/reducers/training/trainingSlice';
import { clearScore, setIsEnd, throwState } from '../../../../common/reducers/training/trainingRoundSlice';
import { Round } from '../../common/round';

interface ResultProps {
    count_word_to_training: number;
    roundObj: Round;
}

const End: React.FC<ResultProps> = ({ count_word_to_training, roundObj }) => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTrainingInfo())
        dispatch(throwState()); // очищаем текущий state
    }, [dispatch]);

    function handleAction() {
        console.log('handleAction')
        dispatch(clearScore());
        // переключить isEnd на false
        dispatch(setIsEnd(false));
    }
    return (
        <div className="align-items-center">
            <div className="container mb-4">
                <div className="text-center mt-5">
                    <div className="px-4 pt-5 mt-5 text-center">
                        <ResultHeader score={roundObj.score} />
                        <div className="col-lg-8 mx-auto">
                            <ResultMessage countWordToTraining={count_word_to_training} />
                            <ActionButtons 
                                countWordToTraining={count_word_to_training} 
                                type='recognize' 
                                handleAction={handleAction} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default End;