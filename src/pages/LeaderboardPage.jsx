import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action.js';
import LeaderboardItem from '../components/LeaderboardItem.jsx';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="leaderboard-page">
      <h2 className="leaderboard-page__title">Leaderboard</h2>
      <p className="leaderboard-page__subtitle">
        Pengguna paling aktif di diskus.in <br />
      </p>
      <div className="leaderboard-page__list">
        {leaderboards.map((item, index) => (
          <LeaderboardItem
            key={item.user.id}
            user={item.user}
            score={item.score}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default LeaderboardPage;
