import React from 'react';
import LoginForm from './LoginForm.jsx';

export default {
  title: 'Components/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    login: (credentials) => alert(`Mock Login: ${JSON.stringify(credentials)}`),
  },
};
