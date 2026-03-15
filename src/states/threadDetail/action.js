import api from '../../utils/api.js';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_DETAIL: 'TOGGLE_UPVOTE_DETAIL',
  TOGGLE_DOWNVOTE_DETAIL: 'TOGGLE_DOWNVOTE_DETAIL',
  TOGGLE_NEUTRAL_VOTE_DETAIL: 'TOGGLE_NEUTRAL_VOTE_DETAIL',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  TOGGLE_NEUTRAL_VOTE_COMMENT: 'TOGGLE_NEUTRAL_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { threadDetail },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
}

function toggleUpVoteDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UPVOTE_DETAIL,
    payload: { userId },
  };
}

function toggleDownVoteDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_DETAIL,
    payload: { userId },
  };
}

function toggleNeutralVoteDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_DETAIL,
    payload: { userId },
  };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function toggleNeutralVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_COMMENT,
    payload: { commentId, userId },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());
    const threadDetail = await api.getThreadDetail(threadId);
    dispatch(receiveThreadDetailActionCreator(threadDetail));
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    const comment = await api.createComment({ threadId, content });
    dispatch(addCommentActionCreator(comment));
  };
}

function asyncToggleUpVoteDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpVoteDetailActionCreator(authUser.id));
    try {
      if (threadDetail.upVotesBy.includes(authUser.id)) {
        await api.neutralVoteThread(threadDetail.id);
      } else {
        await api.upVoteThread(threadDetail.id);
      }
    } catch {
      dispatch(toggleUpVoteDetailActionCreator(authUser.id));
    }
  };
}

function asyncToggleDownVoteDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownVoteDetailActionCreator(authUser.id));
    try {
      if (threadDetail.downVotesBy.includes(authUser.id)) {
        await api.neutralVoteThread(threadDetail.id);
      } else {
        await api.downVoteThread(threadDetail.id);
      }
    } catch {
      dispatch(toggleDownVoteDetailActionCreator(authUser.id));
    }
  };
}

function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(
      toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id })
    );
    try {
      const comment = threadDetail.comments.find((c) => c.id === commentId);
      if (comment.upVotesBy.includes(authUser.id)) {
        await api.neutralVoteComment(threadDetail.id, commentId);
      } else {
        await api.upVoteComment(threadDetail.id, commentId);
      }
    } catch {
      dispatch(
        toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id })
      );
    }
  };
}

function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(
      toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id })
    );
    try {
      const comment = threadDetail.comments.find((c) => c.id === commentId);
      if (comment.downVotesBy.includes(authUser.id)) {
        await api.neutralVoteComment(threadDetail.id, commentId);
      } else {
        await api.downVoteComment(threadDetail.id, commentId);
      }
    } catch {
      dispatch(
        toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id })
      );
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  toggleUpVoteDetailActionCreator,
  toggleDownVoteDetailActionCreator,
  toggleNeutralVoteDetailActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  toggleNeutralVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteDetail,
  asyncToggleDownVoteDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};
