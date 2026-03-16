import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer.js';
import { ActionType } from './action.js';

describe('threadsReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
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
        body: 'Ini adalah thread pertama',
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
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T08:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toHaveLength(2);
    expect(nextState[0]).toEqual(action.payload.thread);
  });

  it('should toggle upvote on a thread when given TOGGLE_UPVOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['user-2'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState[0].upVotesBy).toContain('user-2');
    expect(nextState[0].downVotesBy).not.toContain('user-2');

    const nextState2 = threadsReducer(nextState, action);
    expect(nextState2[0].upVotesBy).not.toContain('user-2');
  });

  it('should toggle downvote on a thread when given TOGGLE_DOWNVOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['user-2'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };

    const nextState = threadsReducer(initialState, action);
    expect(nextState[0].downVotesBy).toContain('user-2');
    expect(nextState[0].upVotesBy).not.toContain('user-2');

    const nextState2 = threadsReducer(nextState, action);
    expect(nextState2[0].downVotesBy).not.toContain('user-2');
  });

  it('should remove user from upvote and downvote when given TOGGLE_NEUTRAL_VOTE_THREAD action', () => {
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['user-2'],
        downVotesBy: ['user-3'],
        totalComments: 0,
      },
    ];

    // Neutral vote user-2: hapus dari upVotesBy
    const action1 = {
      type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-2' },
    };
    const nextState1 = threadsReducer(initialState, action1);
    expect(nextState1[0].upVotesBy).not.toContain('user-2');

    const action2 = {
      type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'user-3' },
    };
    const nextState2 = threadsReducer(initialState, action2);
    expect(nextState2[0].downVotesBy).not.toContain('user-3');
  });
});
