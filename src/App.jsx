import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action.js';
import { asyncUnsetAuthUser } from './states/authUser/action.js';
import Navigation from './components/Navigation.jsx';
import LoadingBar from './components/LoadingBar.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import HomePage from './pages/HomePage.jsx';
import ThreadDetailPage from './pages/ThreadDetailPage.jsx';
import CreateThreadPage from './pages/CreateThreadPage.jsx';
import LeaderboardPage from './pages/LeaderboardPage.jsx';

function App() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return (
      <div className="preload">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <Navigation authUser={authUser} signOut={onSignOut} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/threads/:id" element={<ThreadDetailPage />} />
          <Route path="/threads/new" element={<CreateThreadPage />} />
          <Route path="/leaderboards" element={<LeaderboardPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
