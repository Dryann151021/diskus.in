import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';
import { asyncSetAuthUser } from '../states/authUser/action.js';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async ({ email, password }) => {
    try {
      await dispatch(asyncSetAuthUser({ email, password }));
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-page__card">
        <header className="auth-page__header">
          <h1 className="auth-page__logo">diskus.in</h1>
          <p className="auth-page__subtitle">Masuk ke akunmu</p>
        </header>
        <main className="auth-page__main">
          <LoginForm login={onLogin} />
          <p className="auth-page__link">
            Belum punya akun? <Link to="/register">Daftar sekarang</Link>
          </p>
        </main>
      </div>
    </section>
  );
}

export default Login;
