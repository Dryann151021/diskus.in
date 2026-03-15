import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm.jsx';
import { asyncRegisterUser } from '../states/authUser/action.js';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-page__card">
        <header className="auth-page__header">
          <h1 className="auth-page__logo">diskus.in</h1>
          <p className="auth-page__subtitle">Buat akun baru</p>
        </header>
        <main className="auth-page__main">
          <RegisterForm register={onRegister} />
          <p className="auth-page__link">
            Sudah punya akun? <Link to="/login">Login di sini</Link>
          </p>
        </main>
      </div>
    </section>
  );
}

export default Register;
