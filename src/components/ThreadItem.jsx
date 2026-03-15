import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiMessageCircle, FiClock } from 'react-icons/fi';
import VoteButton from './VoteButton.jsx';
import { postedAt } from '../utils/index.js';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  owner,
  authUserId,
  onUpVote,
  onDownVote,
}) {
  const bodyPreview = body.length > 150 ? `${body.substring(0, 150)}...` : body;

  return (
    <article className="thread-item">
      <div className="thread-item__header">
        <span className="thread-item__category">#{category}</span>
      </div>
      <Link to={`/threads/${id}`} className="thread-item__title">
        <h3>{title}</h3>
      </Link>
      <div
        className="thread-item__body"
        dangerouslySetInnerHTML={{ __html: bodyPreview }}
      />
      <div className="thread-item__footer">
        <VoteButton
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
        />
        <div className="thread-item__meta">
          <span className="thread-item__comments">
            <FiMessageCircle />
            {totalComments}
          </span>
          <span className="thread-item__time">
            <FiClock />
            {postedAt(createdAt)}
          </span>
        </div>
        <div className="thread-item__owner">
          {owner?.avatar && (
            <img
              src={owner.avatar}
              alt={owner.name}
              className="thread-item__avatar"
            />
          )}
          <span>{owner?.name || 'Unknown'}</span>
        </div>
      </div>
    </article>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

ThreadItem.defaultProps = {
  owner: null,
  authUserId: null,
};

export default ThreadItem;
