import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer.js';
import { ActionType } from './action.js';

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

describe('threadDetailReducer function', () => {
  it('should return the initial state (null) when given unknown action', () => {
    const nextState = threadDetailReducer(undefined, { type: 'UNKNOWN' });

    expect(nextState).toBeNull();
  });

  it('should return the thread detail when given RECEIVE_THREAD_DETAIL action', () => {
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail: fakeThreadDetail },
    };

    const nextState = threadDetailReducer(null, action);

    expect(nextState).toEqual(fakeThreadDetail);
  });

  it('should return null when given CLEAR_THREAD_DETAIL action', () => {
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    const nextState = threadDetailReducer(fakeThreadDetail, action);

    expect(nextState).toBeNull();
  });

  it('should add a new comment when given ADD_COMMENT action', () => {
    const newComment = {
      id: 'comment-2',
      content: 'Ini adalah komentar kedua',
      createdAt: '2021-06-21T08:00:00.000Z',
      owner: {
        id: 'users-2',
        name: 'Jane Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: ActionType.ADD_COMMENT,
      payload: { comment: newComment },
    };

    const nextState = threadDetailReducer(fakeThreadDetail, action);

    expect(nextState.comments).toHaveLength(2);
    expect(nextState.comments[0]).toEqual(newComment);
  });

  it('should toggle upvote on thread detail when given TOGGLE_UPVOTE_DETAIL action', () => {
    const action = {
      type: ActionType.TOGGLE_UPVOTE_DETAIL,
      payload: { userId: 'user-1' },
    };

    const nextState = threadDetailReducer(fakeThreadDetail, action);
    expect(nextState.upVotesBy).toContain('user-1');

    const nextState2 = threadDetailReducer(nextState, action);
    expect(nextState2.upVotesBy).not.toContain('user-1');
  });

  it('should toggle upvote on a comment when given TOGGLE_UPVOTE_COMMENT action', () => {
    const action = {
      type: ActionType.TOGGLE_UPVOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' },
    };

    const nextState = threadDetailReducer(fakeThreadDetail, action);
    const comment = nextState.comments.find((c) => c.id === 'comment-1');

    expect(comment.upVotesBy).toContain('user-1');
    expect(comment.downVotesBy).not.toContain('user-1');

    const nextState2 = threadDetailReducer(nextState, action);
    const comment2 = nextState2.comments.find((c) => c.id === 'comment-1');

    expect(comment2.upVotesBy).not.toContain('user-1');
  });

  it('should toggle downvote on a comment when given TOGGLE_DOWNVOTE_COMMENT action', () => {
    const stateWithUpvote = {
      ...fakeThreadDetail,
      comments: [
        {
          ...fakeThreadDetail.comments[0],
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
      payload: { commentId: 'comment-1', userId: 'user-1' },
    };

    const nextState = threadDetailReducer(stateWithUpvote, action);
    const comment = nextState.comments.find((c) => c.id === 'comment-1');

    expect(comment.downVotesBy).toContain('user-1');
    expect(comment.upVotesBy).not.toContain('user-1');

    const nextState2 = threadDetailReducer(nextState, action);
    const comment2 = nextState2.comments.find((c) => c.id === 'comment-1');

    expect(comment2.downVotesBy).not.toContain('user-1');
  });
});
