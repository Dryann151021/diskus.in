import React from 'react';
import PropTypes from 'prop-types';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

function VoteButton({
  upVotesBy,
  downVotesBy,
  authUserId,
  onUpVote,
  onDownVote,
}) {
  const isUpVoted = authUserId && upVotesBy.includes(authUserId);
  const isDownVoted = authUserId && downVotesBy.includes(authUserId);

  return (
    <div className="vote-button">
      <button
        type="button"
        className={`vote-button__up ${isUpVoted ? 'vote-button--active-up' : ''}`}
        onClick={onUpVote}
        aria-label="Up vote"
      >
        <FiThumbsUp />
        <span>{upVotesBy.length}</span>
      </button>
      <button
        type="button"
        className={`vote-button__down ${isDownVoted ? 'vote-button--active-down' : ''}`}
        onClick={onDownVote}
        aria-label="Down vote"
      >
        <FiThumbsDown />
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  );
}

VoteButton.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

VoteButton.defaultProps = {
  authUserId: null,
};

export default VoteButton;
