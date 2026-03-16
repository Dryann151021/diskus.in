/**
 * Skenario pengujian LoginForm component
 *
 * - LoginForm component
 *   - should render email input, password input, and submit button
 *   - should call login function with email and password when form is submitted
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm.jsx';

describe('LoginForm component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render email input, password input, and submit button', () => {
    // Arrange
    const mockLogin = vi.fn();

    // Action
    render(<LoginForm login={mockLogin} />);

    // Assert
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('should call login function with email and password when form is submitted', async () => {
    // Arrange
    const mockLogin = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm login={mockLogin} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });

    // Action
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'john@example.com',
      password: 'password123',
    });
  });
});
