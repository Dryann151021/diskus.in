import React from 'react';
import PropTypes from 'prop-types';
import VoteButton from './VoteButton.jsx';
import { postedAt } from '../utils/index.js';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUserId,
  onUpVote,
  onDownVote,
}) {
  return (
    <div className="comment-item">
      <div className="comment-item__header">
        <div className="comment-item__owner">
          {owner?.avatar && (
            <img
              src={owner.avatar}
              alt={owner.name}
              className="comment-item__avatar"
            />
          )}
          <span className="comment-item__name">{owner?.name || 'Unknown'}</span>
        </div>
        <span className="comment-item__time">{postedAt(createdAt)}</span>
      </div>
      <div
        className="comment-item__content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="comment-item__footer">
        <VoteButton
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
        />
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

CommentItem.defaultProps = {
  owner: null,
  authUserId: null,
};

export default CommentItem;
