import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer.js';
import { ActionType } from './action.js';

describe('isPreloadReducer', () => {
  it('should return the initial state (true) when given unknown action', () => {
    const initialState = true;
    const action = { type: 'UNKNOWN' };
    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toBe(true);
  });

  it('should return false when given SET_IS_PRELOAD action with false payload', () => {
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: { isPreload: false },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toBe(false);
  });
});
