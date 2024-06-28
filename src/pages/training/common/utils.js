import { fetchTraining } from "../../../common/reducers/training/trainingSlice";
import { fetchHome } from "../../../common/reducers/homeSlice";

import { clearRound, clearScore } from "../../../common/reducers/training/recognizeSlice";

export function getTrainig(dispatch, isEnd, patchLoading, localType) {
    // Проверяем, что выполняются следующие условия:
    // 1. Во время рендара, isEnd должен быть false, чтобы не сбросить счет и не обновить state
    // 2. Переменная patchLoading имеет значение false (falsy значение)
    // это нужно для того, чтобы сделать fetchTraining с самыми свежими данными
    // так как patchLoading обновляет бд

    if (!isEnd & !patchLoading) {
        dispatch(fetchTraining(localType));
        dispatch(clearScore());
        dispatch(clearRound());
    }
}


export function getTLeargingWord(dispatch, learning_words) {

    // learning_words нужны для того чтобы обработать их отсудствие и отобразить noWordPage
    if (!learning_words) {
        dispatch(fetchHome());
    }
}
