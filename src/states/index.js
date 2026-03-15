import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer.js';
import isPreloadReducer from './isPreload/reducer.js';
import threadsReducer from './threads/reducer.js';
import threadDetailReducer from './threadDetail/reducer.js';
import usersReducer from './users/reducer.js';
import leaderboardsReducer from './leaderboards/reducer.js';
import isLoadingReducer from './isLoading/reducer.js';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    users: usersReducer,
    leaderboards: leaderboardsReducer,
    isLoading: isLoadingReducer,
  },
});

export default store;
