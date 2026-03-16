import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm.jsx';

describe('LoginForm component', () => {
  it('should render email and password input fields', () => {
    render(<LoginForm login={() => {}} />);

    const emailInput = screen.getByPlaceholderText('Masukkan email');
    const passwordInput = screen.getByPlaceholderText('Masukkan password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should render Login button', () => {
    render(<LoginForm login={() => {}} />);

    const loginButton = screen.getByRole('button', { name: 'Login' });

    expect(loginButton).toBeInTheDocument();
  });

  it('should call login function with email and password when form is submitted', async () => {
    const mockLogin = vi.fn();
    render(<LoginForm login={mockLogin} />);

    const emailInput = screen.getByPlaceholderText('Masukkan email');
    const passwordInput = screen.getByPlaceholderText('Masukkan password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });
  });
});
