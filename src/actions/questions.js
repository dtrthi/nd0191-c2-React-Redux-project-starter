import { hideLoading, showLoading } from "react-redux-loading-bar";
import { _saveQuestion, _saveQuestionAnswer } from "../_DATA";
import { addUserAnswer, addUserQuestion } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const UPDATE_VOTES = "UPDATE_VOTES";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function updateVotes(questionId, option, userId) {
  return {
    type: UPDATE_VOTES,
    questionId,
    option,
    userId,
  };
}

export function handleAddQuestion(question, cb = () => {}) {
  return (dispatch) => {
    dispatch(showLoading());
    _saveQuestion(question)
      .then((newQuestion) => {
        dispatch(addQuestion(newQuestion));
        dispatch(addUserQuestion(newQuestion.author, newQuestion.id));
        dispatch(hideLoading());
        cb();
      })
      .catch(() => {
        alert("Cannot save question");
      });
  };
}

export function handleSaveQuestionAnwser(answer) {
  return (dispatch) => {
    dispatch(showLoading());
    _saveQuestionAnswer(answer).then(() => {
      dispatch(
        addUserAnswer(answer.authedUser, { [answer.qid]: answer.answer }),
      );
      dispatch(hideLoading());
    });
  };
}
