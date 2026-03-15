import { ActionType } from './action.js';

function leaderboardsReducer(leaderboards = [], action = {}) {
  /* eslint-disable indent */
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return action.payload.leaderboards;
    default:
      return leaderboards;
  }
  /* eslint-enable indent */
}

export default leaderboardsReducer;
