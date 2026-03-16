import { describe, it, expect, vi, beforeEach } from 'vitest';
import { asyncPopulateUsersAndThreads } from './action.js';
import { ActionType as ThreadsActionType } from '../threads/action.js';
import { ActionType as UsersActionType } from '../users/action.js';
import { ActionType as LoadingActionType } from '../isLoading/action.js';
import api from '../../utils/api.js';

vi.mock('../../utils/api.js');

const fakeUsersResponse = [
  {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.png',
  },
  {
    id: 'users-2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://example.com/avatar2.png',
  },
];

const fakeThreadsResponse = [
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

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch actions correctly when data fetching is successful', async () => {
    api.getAllUsers.mockResolvedValue(fakeUsersResponse);
    api.getAllThreads.mockResolvedValue(fakeThreadsResponse);

    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: LoadingActionType.SET_LOADING,
      payload: { isLoading: true },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: UsersActionType.RECEIVE_USERS,
      payload: { users: fakeUsersResponse },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: ThreadsActionType.RECEIVE_THREADS,
      payload: { threads: fakeThreadsResponse },
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: LoadingActionType.SET_LOADING,
      payload: { isLoading: false },
    });
  });

  it('should dispatch hideLoading and call alert when data fetching fails', async () => {
    api.getAllUsers.mockRejectedValue(new Error('Network Error'));
    api.getAllThreads.mockRejectedValue(new Error('Network Error'));

    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: LoadingActionType.SET_LOADING,
      payload: { isLoading: true },
    });

    expect(window.alert).toHaveBeenCalledWith('Network Error');
    expect(dispatch).toHaveBeenCalledWith({
      type: LoadingActionType.SET_LOADING,
      payload: { isLoading: false },
    });
  });
});
