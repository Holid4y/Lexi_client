import { TypedUseSelectorHook } from 'react-redux';

import { addScore, nextRound, setAnswer, setIsCorrect, setIsEnd, setIsViewResult, setSelectedLable, throwOneRoundState } from "../../../common/reducers/training/trainingRoundSlice";
import { cleanAnswer } from './utils';
import { fetchTrainingPatch } from '../../../common/reducers/training/trainingSlice';
import { Training } from './training';


export class RoundManager {
    dispatch: (action: any) => void;
    round: number
    trainingObj: Training


    constructor(dispatch: (action: any) => void, round: number, trainingObj: Training) {
        this.dispatch = dispatch;
        this.round = round
        this.trainingObj = trainingObj

    }

    performRoundSwitch() {
        if (this.round + 1 === this.trainingObj.training.length) {
            this.dispatch(setIsEnd(true)); // отображаем страницу окончания
        } else {
            this.dispatch(nextRound()) // отображает следующий раунд
        }

        this.dispatch(setAnswer(null)) // Сбрасываем выбранный вариант для следующего раунда
        
        this.dispatch(throwOneRoundState()) // просле переключения раунда, очищаем state
        
    }

    handleFinalAnswer(answer: string) {
        const isCorrect = this.#checkAnswer(this.trainingObj, answer);
        this.#sendResutToBackend(this.trainingObj, isCorrect)
        this.#checkRound(isCorrect)
    }

    #checkAnswer(trainingObj: Training, answer: string) {
        const correctWord = trainingObj.getCurrentRound().word.text
        const cleanWord = cleanAnswer(answer);
        const resultBool = correctWord === cleanWord;
        this.dispatch(setIsCorrect(resultBool));
        return resultBool;
    }
    #sendResutToBackend(trainingObj: Training, isCorrect: boolean) {
        let typeName = trainingObj.type
  
        const data = {
            type: typeName,
            pk: trainingObj.getCurrentRound().training.pk,
            is_correct: isCorrect,
        };

        this.dispatch(fetchTrainingPatch(data));
    }
    #checkRound(isCorrect: boolean) {
        if (isCorrect) {
            // прибавляем балл за правельный ответ
            this.dispatch(addScore());
            this.dispatch(setIsViewResult(true));
            // Это позволяет добавить задержку перед переключением на следующий раунд
            
            const timeCallDown = 1000 // FIXME должно быть из настроек пользователя
    
            setTimeout(() => this.performRoundSwitch(), timeCallDown);
        } else {
            this.dispatch(setIsViewResult(true));
        }
    }

}