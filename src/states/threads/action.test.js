import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  asyncAddThread,
  asyncToggleUpVoteThread,
  ActionType,
} from './action.js';
import api from '../../utils/api.js';

vi.mock('../../utils/api.js');

const fakeThread = {
  id: 'thread-1',
  title: 'Thread Baru',
  body: 'Isi thread baru',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch ADD_THREAD action when thread creation is successful', async () => {
    api.createThread.mockResolvedValue(fakeThread);
    const dispatch = vi.fn();

    await asyncAddThread({
      title: 'Thread Baru',
      body: 'Isi thread baru',
      category: 'General',
    })(dispatch);

    expect(api.createThread).toHaveBeenCalledWith({
      title: 'Thread Baru',
      body: 'Isi thread baru',
      category: 'General',
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.ADD_THREAD,
      payload: { thread: fakeThread },
    });
  });
});

describe('asyncToggleUpVoteThread thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch TOGGLE_UPVOTE_THREAD action (optimistic update)', async () => {
    api.upVoteThread.mockResolvedValue();
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: { id: 'users-1' },
    });

    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-1' },
    });
  });

  it('should dispatch TOGGLE_UPVOTE_THREAD again as rollback when API call fails', async () => {
    api.upVoteThread.mockRejectedValue(new Error('Network error'));
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: { id: 'users-1' },
    });

    await asyncToggleUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-1' },
    });

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: { threadId: 'thread-1', userId: 'users-1' },
    });
  });
});
