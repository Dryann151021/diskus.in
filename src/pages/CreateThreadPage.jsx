import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action.js';
import ThreadInput from '../components/ThreadInput.jsx';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = async ({ title, body, category }) => {
    try {
      await dispatch(asyncAddThread({ title, body, category }));
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="create-thread-page">
      <h2 className="create-thread-page__title">Buat Thread Baru</h2>
      <ThreadInput onAddThread={onAddThread} />
    </div>
  );
}

export default CreateThreadPage;
