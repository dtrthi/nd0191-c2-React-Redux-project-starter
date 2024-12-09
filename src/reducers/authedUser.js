import { LOGIN, LOGOUT } from "../actions/authedUser";

export function authedUser(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}
