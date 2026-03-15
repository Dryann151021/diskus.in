import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiAward,
  FiPlusSquare,
  FiLogOut,
  FiLogIn,
} from 'react-icons/fi';

function Navigation({ authUser, signOut }) {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="navigation__inner">
        <Link to="/" className="navigation__logo">
          <h1>diskus.in</h1>
        </Link>
        <div className="navigation__links">
          <Link
            to="/"
            className={`navigation__link ${location.pathname === '/' ? 'active' : ''}`}
            title="Beranda"
          >
            <FiHome />
            <span>Beranda</span>
          </Link>
          <Link
            to="/leaderboards"
            className={`navigation__link ${location.pathname === '/leaderboards' ? 'active' : ''}`}
            title="Leaderboard"
          >
            <FiAward />
            <span>Leaderboard</span>
          </Link>
          {authUser ? (
            <>
              <Link
                to="/threads/new"
                className={`navigation__link ${location.pathname === '/threads/new' ? 'active' : ''}`}
                title="Buat Thread"
              >
                <FiPlusSquare />
                <span>Buat Thread</span>
              </Link>
              <div className="navigation__user">
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  className="navigation__avatar"
                />
                <span className="navigation__name">{authUser.name}</span>
              </div>
              <button
                type="button"
                className="navigation__link navigation__logout"
                onClick={signOut}
                title="Keluar"
              >
                <FiLogOut />
                <span>Keluar</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`navigation__link ${location.pathname === '/login' ? 'active' : ''}`}
              title="Login"
            >
              <FiLogIn />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  signOut: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  authUser: null,
};

export default Navigation;
