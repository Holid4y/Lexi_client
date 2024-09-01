import { TypedUseSelectorHook } from 'react-redux';

import { addScore, nextRound, setAnswer, setIsCorrect, setIsEnd, setIsViewResult, setSelectedLable, throwOneRoundState } from "../../../common/reducers/training/trainingRoundSlice";
import { cleanAnswer } from './utils';
import { fetchTrainingPatch } from '../../../common/reducers/training/trainingSlice';
import { FalseSetItem, Recognize, Reproduse, Training } from './training';


export class Round {
    dispatch: (action: any) => void;
    useSelector: TypedUseSelectorHook<any>;

    round: number
    score: number
    training: any[]
    isEnd: boolean

    // one round state
    answer: string
    isViewResult: boolean
    isCorrect: boolean
    selectedLable: null | number

    constructor(dispatch: (action: any) => void, useSelector: TypedUseSelectorHook<any>) {
        this.dispatch = dispatch;
        this.useSelector = useSelector;

        this.training = this.useSelector((state) => state.trainingRound.training);
        this.round = this.useSelector((state) => state.trainingRound.round);
        this.score = this.useSelector((state) => state.trainingRound.score);
        this.isEnd = this.useSelector((state) => state.trainingRound.isEnd);

        this.answer = this.useSelector((state) => state.trainingRound.answer);
        this.isViewResult = this.useSelector((state) => state.trainingRound.isViewResult);
        this.isCorrect = this.useSelector((state) => state.trainingRound.isCorrect);
        this.selectedLable = this.useSelector((state) => state.trainingRound.selectedLable);
    }

    setSelectedLable(lableIndex: number) {
        this.dispatch(setSelectedLable(lableIndex))
    }

    setAnswer(answer: string) {
        this.answer = answer
    }

    getCurrentRound() {
        return this.round
    }   

    getTrainingLength() {
        return this.training.length
    }

    performRoundSwitch() {
        if (this.round + 1 === this.getTrainingLength()) {
            this.dispatch(setIsEnd(true)); // отображаем страницу окончания
        } else {
            this.dispatch(nextRound()) // отображает следующий раунд
        }

        this.dispatch(setAnswer(null)) // Сбрасываем выбранный вариант для следующего раунда
        
        this.dispatch(throwOneRoundState()) // просле переключения раунда, очищаем state
        
    }

    handleFinalAnswer(trainingObj: Training) {
        
        const isCorrect = this.#checkAnswer(trainingObj);

        this.#sendResutToBackend(trainingObj, isCorrect)
        this.#checkRound(isCorrect)
    }

    #checkAnswer(trainingObj: Training) {
        const correctWord = trainingObj.getCurrentRound().word.text
        const cleanWord = cleanAnswer(this.answer);
        const resultBool = correctWord === cleanWord;
        this.dispatch(setIsCorrect(resultBool));
        return resultBool;
    }
    #sendResutToBackend(trainingObj: Training, isCorrect: boolean) {
        let typeName = ''
        if (trainingObj instanceof Recognize) {
            typeName = 'recognize'
        } else if (trainingObj instanceof Reproduse) {
            typeName = 'reproduce'
        }
  
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