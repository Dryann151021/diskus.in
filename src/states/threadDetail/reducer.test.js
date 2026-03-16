import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer.js';
import { ActionType } from './action.js';

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.png',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Komentar pertama',
      createdAt: '2021-06-21T08:00:00.000Z',
      owner: {
        id: 'users-2',
        name: 'Jane Doe',
        avatar: 'https://example.com/avatar2.png',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe('threadDetailReducer', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it('should return thread detail when given RECEIVE_THREAD_DETAIL action', () => {
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail: fakeThreadDetail },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(fakeThreadDetail);
  });

  it('should return null when given CLEAR_THREAD_DETAIL action', () => {
    const initialState = fakeThreadDetail;
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it('should add a comment to thread detail when given ADD_COMMENT action', () => {
    const initialState = { ...fakeThreadDetail };
    const newComment = {
      id: 'comment-2',
      content: 'Komentar kedua',
      createdAt: '2021-06-21T09:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://example.com/avatar.png',
      },
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: { comment: newComment },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments).toHaveLength(2);
    expect(nextState.comments[0]).toEqual(newComment);
  });

  it('should toggle upvote on thread detail when given TOGGLE_UPVOTE_DETAIL action', () => {
    const initialState = {
      ...fakeThreadDetail,
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.TOGGLE_UPVOTE_DETAIL,
      payload: { userId: 'users-1' },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState.upVotesBy).toContain('users-1');

    const nextState2 = threadDetailReducer(nextState, action);
    expect(nextState2.upVotesBy).not.toContain('users-1');
  });

  it('should toggle downvote on thread detail when given TOGGLE_DOWNVOTE_DETAIL action', () => {
    const initialState = {
      ...fakeThreadDetail,
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_DETAIL,
      payload: { userId: 'users-1' },
    };

    const nextState = threadDetailReducer(initialState, action);
    expect(nextState.downVotesBy).toContain('users-1');

    const nextState2 = threadDetailReducer(nextState, action);
    expect(nextState2.downVotesBy).not.toContain('users-1');
  });

  it('should remove vote when given TOGGLE_NEUTRAL_VOTE_DETAIL action', () => {
    const initialState = {
      ...fakeThreadDetail,
      upVotesBy: ['users-1'],
      downVotesBy: ['users-2'],
    };
    const action = {
      type: ActionType.TOGGLE_NEUTRAL_VOTE_DETAIL,
      payload: { userId: 'users-1' },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).not.toContain('users-1');
    expect(nextState.downVotesBy).not.toContain('users-1');
  });

  it('should toggle upvote on comment when given TOGGLE_UPVOTE_COMMENT action', () => {
    const initialState = { ...fakeThreadDetail };
    const action = {
      type: ActionType.TOGGLE_UPVOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'users-1' },
    };

    const nextState = threadDetailReducer(initialState, action);

    const comment = nextState.comments.find((c) => c.id === 'comment-1');
    expect(comment.upVotesBy).toContain('users-1');
  });

  it('should toggle downvote on comment when given TOGGLE_DOWNVOTE_COMMENT action', () => {
    const initialState = { ...fakeThreadDetail };
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'users-1' },
    };

    const nextState = threadDetailReducer(initialState, action);

    const comment = nextState.comments.find((c) => c.id === 'comment-1');
    expect(comment.downVotesBy).toContain('users-1');
  });

  it('should remove vote on comment when given TOGGLE_NEUTRAL_VOTE_COMMENT action', () => {
    const initialState = {
      ...fakeThreadDetail,
      comments: [
        {
          ...fakeThreadDetail.comments[0],
          upVotesBy: ['users-1'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.TOGGLE_NEUTRAL_VOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'users-1' },
    };

    const nextState = threadDetailReducer(initialState, action);

    const comment = nextState.comments.find((c) => c.id === 'comment-1');
    expect(comment.upVotesBy).not.toContain('users-1');
  });
});
