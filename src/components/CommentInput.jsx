import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSend } from 'react-icons/fi';

function CommentInput({ onAddComment }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onAddComment(content);
      setContent('');
    }
  };

  return (
    <form className="comment-input" onSubmit={handleSubmit}>
      <h4 className="comment-input__title">Beri Komentar</h4>
      <textarea
        className="comment-input__field"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis komentarmu..."
        rows="4"
      />
      <button type="submit" className="comment-input__submit">
        <FiSend />
        <span>Kirim</span>
      </button>
    </form>
  );
}

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default CommentInput;
