import React from 'react';
import PropTypes from 'prop-types';
import { FiAward } from 'react-icons/fi';

function LeaderboardItem({ user, score, rank }) {
  return (
    <div
      className={`leaderboard-item ${rank <= 3 ? `leaderboard-item--top${rank}` : ''}`}
    >
      <div className="leaderboard-item__rank">
        {rank <= 3 ? (
          <FiAward className={`leaderboard-item__trophy--${rank}`} />
        ) : (
          rank
        )}
      </div>
      <img
        src={user.avatar}
        alt={user.name}
        className="leaderboard-item__avatar"
      />
      <div className="leaderboard-item__info">
        <span className="leaderboard-item__name">{user.name}</span>
      </div>
      <div className="leaderboard-item__score">
        <span className="leaderboard-item__score-value">{score}</span>
        <span className="leaderboard-item__score-label">poin</span>
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
};

export default LeaderboardItem;
