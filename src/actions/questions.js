import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const ADD_QUESTION = 'ADD_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export const addQuestion=(question)=> {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export const handleAddQuestion=(optionOneText, optionTwoText)=> {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    const questionInfo = {
      optionOneText,
      optionTwoText,
      author: authedUser,
    };

    return saveQuestion(questionInfo)
      .then( (question)=> { dispatch(addQuestion(question)) });
  };
}

export const receiveQuestions=(questions)=> {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export const answerQuestion=(authedUser, qid, answer)=> {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export const handleAnswerQuestion=(question, answer)=> {
  return (dispatch, getState) =>{
    const { authedUser } = getState();

    const answerInfo = {
      authedUser,
      qid: question.id,
      answer,
    };

    return saveQuestionAnswer(answerInfo)
      .then( ()=> { dispatch((answerQuestion(authedUser, question, answer))) })
  }
}

