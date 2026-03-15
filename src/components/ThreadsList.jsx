import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem.jsx';

function ThreadsList({ threads, users, authUserId, onUpVote, onDownVote }) {
  const threadList = threads.map((thread) => {
    const owner = users.find((user) => user.id === thread.ownerId);
    return (
      <ThreadItem
        key={thread.id}
        {...thread}
        owner={owner}
        authUserId={authUserId}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
      />
    );
  });

  return (
    <div className="threads-list">
      {threadList.length > 0 ? (
        threadList
      ) : (
        <p className="threads-list__empty">
          Belum ada thread. Jadilah yang pertama!
        </p>
      )}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

ThreadsList.defaultProps = {
  authUserId: null,
};

export default ThreadsList;
