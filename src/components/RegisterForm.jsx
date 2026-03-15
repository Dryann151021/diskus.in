import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput.js';

function RegisterForm({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-form__field">
        <label htmlFor="name">Nama</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onNameChange}
          placeholder="Masukkan nama"
          required
        />
      </div>
      <div className="auth-form__field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Masukkan email"
          required
        />
      </div>
      <div className="auth-form__field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Minimal 6 karakter"
          required
        />
      </div>
      <button type="submit" className="auth-form__submit">
        Daftar
      </button>
    </form>
  );
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterForm;
