/**
 * Skenario pengujian RegisterForm component
 *
 * - RegisterForm component
 *   - should render name, email, password inputs and submit button
 *   - should call register function with name, email, and password when form is submitted
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm.jsx';

describe('RegisterForm component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render name, email, password inputs and submit button', () => {
    // Arrange
    const mockRegister = vi.fn();

    // Action
    render(<RegisterForm register={mockRegister} />);

    // Assert
    expect(screen.getByLabelText('Nama')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Daftar' })).toBeInTheDocument();
  });

  it('should call register function with name, email, and password when form is submitted', async () => {
    // Arrange
    const mockRegister = vi.fn();
    const user = userEvent.setup();

    render(<RegisterForm register={mockRegister} />);

    const nameInput = screen.getByLabelText('Nama');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Daftar' });

    // Action
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
  });
});
