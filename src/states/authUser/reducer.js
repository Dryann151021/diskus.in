import { ActionType } from './action';

function authUserReducer(authUser = null, action = {}) {
  /* eslint-disable indent */
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload.authUser;
    case ActionType.UNSET_AUTH_USER:
      return null;
    default:
      return authUser;
  }
  /* eslint-enable indent */
}

export default authUserReducer;
