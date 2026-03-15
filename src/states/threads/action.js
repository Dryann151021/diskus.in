import api from '../../utils/api.js';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
  TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
  TOGGLE_NEUTRAL_VOTE_THREAD: 'TOGGLE_NEUTRAL_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: { threadId, userId },
  };
}

function toggleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: { threadId, userId },
  };
}

function toggleNeutralVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_THREAD,
    payload: { threadId, userId },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    const thread = await api.createThread({ title, body, category });
    dispatch(addThreadActionCreator(thread));
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id })
    );
    try {
      await api.upVoteThread(threadId);
    } catch {
      dispatch(
        toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id })
      );
    }
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id })
    );
    try {
      await api.downVoteThread(threadId);
    } catch {
      dispatch(
        toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id })
      );
    }
  };
}

function asyncToggleNeutralVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id })
    );
    try {
      await api.neutralVoteThread(threadId);
    } catch {
      dispatch(
        toggleNeutralVoteThreadActionCreator({ threadId, userId: authUser.id })
      );
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  toggleNeutralVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncToggleNeutralVoteThread,
};
