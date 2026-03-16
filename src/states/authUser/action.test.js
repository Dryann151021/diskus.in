import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action.js';
import api from '../../utils/api.js';

const fakeToken = 'fake-token-12345';
const fakeUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch setAuthUserActionCreator with user data when login is successful', async () => {
    vi.spyOn(api, 'login').mockResolvedValue(fakeToken);
    vi.spyOn(api, 'putAccessToken').mockImplementation(() => {});
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue(fakeUser);

    const dispatch = vi.fn();

    await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'password123',
    })(dispatch);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
  });

  it('should call api.login and api.getOwnProfile correctly', async () => {
    vi.spyOn(api, 'login').mockResolvedValue(fakeToken);
    vi.spyOn(api, 'putAccessToken').mockImplementation(() => {});
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue(fakeUser);

    const dispatch = vi.fn();

    await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'password123',
    })(dispatch);
    expect(api.login).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });
    expect(api.getOwnProfile).toHaveBeenCalled();
  });

  it('should call api.putAccessToken with the token from login', async () => {
    vi.spyOn(api, 'login').mockResolvedValue(fakeToken);
    vi.spyOn(api, 'putAccessToken').mockImplementation(() => {});
    vi.spyOn(api, 'getOwnProfile').mockResolvedValue(fakeUser);

    const dispatch = vi.fn();

    await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'password123',
    })(dispatch);
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should dispatch unsetAuthUserActionCreator and call api.putAccessToken with empty string', () => {
    vi.spyOn(api, 'putAccessToken').mockImplementation(() => {});

    const dispatch = vi.fn();

    asyncUnsetAuthUser()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith('');
  });
});
