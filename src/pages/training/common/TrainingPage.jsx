// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";


// import { getTrainig, getLeargingWord } from "../common/utils";

// import Header from "../components/Header";
// import WordCard from "../components/WordCard";
// import FalseSet from "./components/FalseSet";
// import End from "../components/End";
// import AnswerButton from "../components/AnswerButton";
// import Loading from "../../../common/components/Treatment/Loading";
// import NoMoreWordToTrainingPage from "../components/NoMoreWordToTrainingPage";
// import NoWordPage from "../components/NoWordPage";

// import { Recognize as RecognizeClass } from "../common/training";
// import { Round } from "../common/round";

// function TrainingPage() {
//     const dispatch = useDispatch();
//     const { count_word_to_training_recognize, loading, patchLoading, error } = useSelector((state) => state.training);
//     const { training, round, score, isEnd } = useSelector((state) => state.trainingRound);
//     const { learning_words } = useSelector((state) => state.home);


//     const trainingObj = new RecognizeClass(dispatch, useSelector);
//     // console.log(trainingObj.getCurrentRound())

//     const roundObj = new Round(dispatch, useSelector);

    

//     const localType = "recognize";

//     useEffect(() => { 
//         if (round == roundObj.getTrainingLength()) {
//             roundObj.setIsEnd(true)
//         }
//     }, [round]);

//     // Используем эффект для отправки запроса на получение тренировки
//     useEffect(() => {
//         getTrainig(dispatch, isEnd, patchLoading, localType);
//         getLeargingWord(dispatch, learning_words);
//     }, [dispatch, isEnd]);


//     const EndPage = <End type={localType} count_word_to_training={count_word_to_training_recognize} score={score} />;

//     const TrainingPage = () => {
//         if (!training) {
//             return null;
//         }

//         return (
//             <div>
//                 <Header roundObj={roundObj}/>
//                 <main className="container pb-0 mb-0">
//                     <WordCard trainingObj={trainingObj}/>
//                     <div className="px-5">
//                         <div className="mb-4">
//                             <FalseSet training={training} round={round} correctWord={training[round].word.text} />
//                         </div>
//                         <AnswerButton localType={localType} />
//                     </div>
//                 </main>
                
//             </div>
//         );
//     };

//     const isNoMoreWordToTraining = count_word_to_training_recognize == 0
//     const isNoWord = learning_words == 0

//     return (
//         <div className="align-items-center">
//             {
//                 loading ? <Loading /> : 
//                 TrainingPage() ||
//                 ((isNoMoreWordToTraining && !isEnd) && <NoMoreWordToTrainingPage />) ||
//                 (isNoWord && <NoWordPage />)
//             }
//             {isEnd && EndPage}

//         </div>
//     );
// }

// export default TrainingPage;
