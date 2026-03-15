import { ActionType } from './action.js';

function isLoadingReducer(isLoading = false, action = {}) {
  /* eslint-disable indent */
  switch (action.type) {
    case ActionType.SET_LOADING:
      return action.payload.isLoading;
    default:
      return isLoading;
  }
  /* eslint-enable indent */
}

export default isLoadingReducer;
