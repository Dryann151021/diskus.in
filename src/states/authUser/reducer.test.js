import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer.js';
import { ActionType } from './action.js';

describe('authUserReducer', () => {
  it('should return the initial state (null) when given unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it('should return auth user when given SET_AUTH_USER action', () => {
    const initialState = null;
    const fakeUser = {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar.png',
    };

    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: fakeUser },
    };

    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(fakeUser);
  });

  it('should return null when given UNSET_AUTH_USER action', () => {
    const initialState = {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar.png',
    };

    const action = {
      type: ActionType.UNSET_AUTH_USER,
      payload: { authUser: null },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBeNull();
  });
});
