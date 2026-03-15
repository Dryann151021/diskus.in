import { ActionType } from './action.js';

function isPreloadReducer(isPreload = true, action = {}) {
  /* eslint-disable indent */
  switch (action.type) {
    case ActionType.SET_IS_PRELOAD:
      return action.payload.isPreload;
    default:
      return isPreload;
  }
  /* eslint-enable indent */
}

export default isPreloadReducer;
