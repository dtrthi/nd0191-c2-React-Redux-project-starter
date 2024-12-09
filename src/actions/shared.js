import { hideLoading, showLoading } from "react-redux-loading-bar";
import { _getQuestions, _getUsers } from "../_DATA";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return Promise.all([_getUsers(), _getQuestions()])
      .then(([users, questions]) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
      })
      .then(() => dispatch(hideLoading()));
  };
}
