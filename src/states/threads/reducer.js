import { ActionType } from './action.js';

function threadsReducer(threads = [], action = {}) {
  /* eslint-disable indent */
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.TOGGLE_UPVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.includes(action.payload.userId)
            ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
            : thread.upVotesBy.concat([action.payload.userId]),
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
        };
      });
    case ActionType.TOGGLE_DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;
        return {
          ...thread,
          downVotesBy: thread.downVotesBy.includes(action.payload.userId)
            ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
            : thread.downVotesBy.concat([action.payload.userId]),
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
        };
      });
    case ActionType.TOGGLE_NEUTRAL_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id !== action.payload.threadId) return thread;
        return {
          ...thread,
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action.payload.userId
          ),
        };
      });
    default:
      return threads;
  }
  /* eslint-enable indent */
}

export default threadsReducer;
