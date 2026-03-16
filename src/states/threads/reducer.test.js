import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer.js';
import { ActionType } from './action.js';

describe('threadsReducer', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return threads when given RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should add a new thread when given ADD_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini thread kedua',
          category: 'Tech',
          createdAt: '2021-06-22T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should toggle upvote on thread when given TOGGLE_UPVOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-1' },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState[0].upVotesBy).toContain('users-1');

    const nextState2 = threadsReducer(nextState, action);
    expect(nextState2[0].upVotesBy).not.toContain('users-1');
  });

  it('should toggle downvote on thread when given TOGGLE_DOWNVOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-1' },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState[0].downVotesBy).toContain('users-1');

    const nextState2 = threadsReducer(nextState, action);
    expect(nextState2[0].downVotesBy).not.toContain('users-1');
  });

  it('should remove upvote and downvote when given TOGGLE_NEUTRAL_VOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1'],
        downVotesBy: ['users-2'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-1' },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).not.toContain('users-1');
    expect(nextState[0].downVotesBy).not.toContain('users-1');
  });

  it('should remove existing downvote when upvoting a thread', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['users-1'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-1' },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toContain('users-1');
    expect(nextState[0].downVotesBy).not.toContain('users-1');
  });
});
