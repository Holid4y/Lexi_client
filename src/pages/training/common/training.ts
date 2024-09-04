import { TypedUseSelectorHook } from 'react-redux';

interface WordObject {
    part_of_speech: string;
    text: string;
    transcription: string;
    translation: string;
}

interface TrainingObject {
    pk: number;
    lvl: number;
}

interface TrainingItem {
    training: TrainingObject;
    word: WordObject;
}

export class Training {
    training: TrainingItem[]
    round: number
    type: string
    

    constructor(training: TrainingItem[], round: number) {
        this.training = training
        this.round = round
        this.type = ''; 
    }

    getCurrentRound() {
        return this.training[this.round]
    }

}


interface RecognizeTrainingItem extends TrainingItem {
    false_set: string[]; 
}

export interface FalseSetItem {
    text: string
    translation: string
    isCorrect: boolean
}

export class Recognize extends Training {
    training: RecognizeTrainingItem[];
    type: string

    constructor(training: TrainingItem[], round: number) {
        super(training, round);
        this.type = 'recognize'; 
    }

    getCurrentRound(): RecognizeTrainingItem {
        const currentRound = super.getCurrentRound();
        return currentRound as RecognizeTrainingItem; 
    }

    getFalseSetList(): FalseSetItem[] {
        return this.makeFalseSet()
    }

    getWordView(isViewResult: boolean): string {
        return this.getCurrentRound().word.text
    }

    makeFalseSet() {
        const correctWord = {
            text: this.getCurrentRound().word.text,
            translation: this.getCurrentRound().word.translation,
            isCorrect: true
        }
        const falseSetListFlat = this.getCurrentRound().false_set
        const falseSetList = falseSetListFlat.map(
            word => ({ 
                text: word, // ложный текст, для неправильного ответа
                translation: word, 
                isCorrect: false    
            })
        );
        falseSetList.push(correctWord);

        
        return this.shufleList(falseSetList);
    }

    shufleList(list: FalseSetItem[]) {
        // Перемешиваем элементы массива с помощью алгоритма Фишера-Йетса
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list
    }
}

export class Reproduce extends Training {
    type: string

    constructor(training: TrainingItem[], round: number) {
        super(training, round);
        this.type = 'reproduce';  
    }

    getCurrentRound(): TrainingItem {
        const currentRound = super.getCurrentRound();
        return currentRound as TrainingItem; 
    }

    getWordView(isViewResult: boolean): string {
        const word = this.getCurrentRound().word

        return isViewResult ? 
        `${word.text} - ${word.translation}` :
        word.translation
    }


    getTips() {
        // Реализация метода getTips
    }
}