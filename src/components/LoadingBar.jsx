import React from 'react';
import PropTypes from 'prop-types';

function LoadingBar({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="loading-bar">
      <div className="loading-bar__progress" />
    </div>
  );
}

LoadingBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoadingBar;
