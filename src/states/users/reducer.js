import { ActionType } from './action.js';

function usersReducer(users = [], action = {}) {
  /* eslint-disable indent */
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return action.payload.users;
    default:
      return users;
  }
  /* eslint-enable indent */
}

export default usersReducer;
