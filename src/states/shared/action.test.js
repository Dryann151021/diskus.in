import { describe, it, expect, vi, beforeEach } from 'vitest';
import { asyncPopulateUsersAndThreads } from './action.js';
import api from '../../utils/api.js';
import { receiveThreadsActionCreator } from '../threads/action.js';
import { receiveUsersActionCreator } from '../users/action.js';
import { showLoading, hideLoading } from '../isLoading/action.js';

const fakeUsers = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeThreads = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeErrorMessage = 'Ups, something went wrong';

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch action correctly when data fetching is successful', async () => {
    vi.spyOn(api, 'getAllUsers').mockResolvedValue(fakeUsers);
    vi.spyOn(api, 'getAllThreads').mockResolvedValue(fakeThreads);

    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsers));
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsActionCreator(fakeThreads)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert when data fetching fails', async () => {
    vi.spyOn(api, 'getAllUsers').mockRejectedValue(new Error(fakeErrorMessage));
    vi.spyOn(api, 'getAllThreads').mockRejectedValue(
      new Error(fakeErrorMessage)
    );

    const dispatch = vi.fn();
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    await asyncPopulateUsersAndThreads()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorMessage);
  });
});
