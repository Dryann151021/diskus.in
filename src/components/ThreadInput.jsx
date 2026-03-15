import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput.js';

function ThreadInput({ onAddThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddThread({ title, body, category: category || 'General' });
  };

  return (
    <form className="thread-input" onSubmit={handleSubmit}>
      <div className="thread-input__field">
        <label htmlFor="title">Judul</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={onTitleChange}
          placeholder="Judul thread"
          required
        />
      </div>
      <div className="thread-input__field">
        <label htmlFor="category">Kategori</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={onCategoryChange}
          placeholder="Contoh: General, Tech, Random"
        />
      </div>
      <div className="thread-input__field">
        <label htmlFor="body">Konten</label>
        <textarea
          id="body"
          value={body}
          onChange={onBodyChange}
          placeholder="Tulis konten thread..."
          rows="8"
          required
        />
      </div>
      <button type="submit" className="thread-input__submit">
        Buat Thread
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  onAddThread: PropTypes.func.isRequired,
};

export default ThreadInput;
