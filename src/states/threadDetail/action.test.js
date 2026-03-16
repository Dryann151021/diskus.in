import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  ActionType,
} from './action.js';
import api from '../../utils/api.js';

vi.mock('../../utils/api.js');

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
  comments: [],
};

const fakeComment = {
  id: 'comment-1',
  content: 'Komentar baru',
  createdAt: '2021-06-21T08:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.png',
  },
  upVotesBy: [],
  downVotesBy: [],
};

describe('asyncReceiveThreadDetail thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch CLEAR_THREAD_DETAIL then RECEIVE_THREAD_DETAIL actions', async () => {
    // Arrange
    api.getThreadDetail.mockResolvedValue(fakeThreadDetail);
    const dispatch = vi.fn();

    // Action
    await asyncReceiveThreadDetail('thread-1')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.CLEAR_THREAD_DETAIL,
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail: fakeThreadDetail },
    });
  });
});

describe('asyncAddComment thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch ADD_COMMENT action when comment creation is successful', async () => {
    // Arrange
    api.createComment.mockResolvedValue(fakeComment);
    const dispatch = vi.fn();

    // Action
    await asyncAddComment({ threadId: 'thread-1', content: 'Komentar baru' })(
      dispatch
    );

    // Assert
    expect(api.createComment).toHaveBeenCalledWith({
      threadId: 'thread-1',
      content: 'Komentar baru',
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.ADD_COMMENT,
      payload: { comment: fakeComment },
    });
  });
});
