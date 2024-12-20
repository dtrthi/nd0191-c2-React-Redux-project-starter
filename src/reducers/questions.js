import {
  ADD_QUESTION,
  RECEIVE_QUESTIONS,
  UPDATE_VOTES,
} from "../actions/questions";

export function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case UPDATE_VOTES:
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          optionOne:
            action.option === "optionOne"
              ? {
                  ...state[action.questionId].optionOne,
                  votes: state[action.questionId].optionOne.votes.concat([
                    action.userId,
                  ]),
                }
              : state[action.questionId].optionOne,
          optionTwo:
            action.option === "optionTwo"
              ? {
                  ...state[action.questionId].optionTwo,
                  votes: state[action.questionId].optionTwo.votes.concat([
                    action.userId,
                  ]),
                }
              : state[action.questionId].optionTwo,
        },
      };
    default:
      return state;
  }
}
