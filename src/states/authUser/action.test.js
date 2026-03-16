import { describe, it, expect, vi, beforeEach } from 'vitest';
import { asyncSetAuthUser, ActionType } from './action.js';
import api from '../../utils/api.js';

vi.mock('../../utils/api.js');

const fakeTokenResponse = 'fake-token-123';
const fakeUserResponse = {
  id: 'users-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.png',
};

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch SET_AUTH_USER correctly when login is successful', async () => {
    api.login.mockResolvedValue(fakeTokenResponse);
    api.putAccessToken.mockImplementation(() => {});
    api.getOwnProfile.mockResolvedValue(fakeUserResponse);

    const dispatch = vi.fn();

    await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'password123',
    })(dispatch);

    expect(api.login).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });

    expect(api.putAccessToken).toHaveBeenCalledWith(fakeTokenResponse);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: fakeUserResponse },
    });
  });

  it('should throw error when login fails', async () => {
    api.login.mockRejectedValue(new Error('Email atau password salah'));

    const dispatch = vi.fn();
    await expect(
      asyncSetAuthUser({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      })(dispatch)
    ).rejects.toThrow('Email atau password salah');
  });
});
