import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteDetail,
  asyncToggleDownVoteDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
} from '../states/threadDetail/action.js';
import VoteButton from '../components/VoteButton.jsx';
import CommentItem from '../components/CommentItem.jsx';
import CommentInput from '../components/CommentInput.jsx';
import { postedAt } from '../utils/index.js';

function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpVoteThread = () => {
    if (!authUser) {
      alert('Silakan login terlebih dahulu.');
      return;
    }
    dispatch(asyncToggleUpVoteDetail());
  };

  const onDownVoteThread = () => {
    if (!authUser) {
      alert('Silakan login terlebih dahulu.');
      return;
    }
    dispatch(asyncToggleDownVoteDetail());
  };

  const onUpVoteComment = (commentId) => {
    if (!authUser) {
      alert('Silakan login terlebih dahulu.');
      return;
    }
    dispatch(asyncToggleUpVoteComment(commentId));
  };

  const onDownVoteComment = (commentId) => {
    if (!authUser) {
      alert('Silakan login terlebih dahulu.');
      return;
    }
    dispatch(asyncToggleDownVoteComment(commentId));
  };

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  if (!threadDetail) {
    return (
      <div className="thread-detail-page">
        <div className="thread-detail__loading">
          <div className="spinner" />
          <p>Memuat thread...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="thread-detail-page">
      <article className="thread-detail">
        <div className="thread-detail__header">
          <span className="thread-detail__category">
            #{threadDetail.category}
          </span>
          <h2 className="thread-detail__title">{threadDetail.title}</h2>
          <div className="thread-detail__meta">
            <div className="thread-detail__owner">
              <img
                src={threadDetail.owner?.avatar}
                alt={threadDetail.owner?.name}
                className="thread-detail__avatar"
              />
              <span>{threadDetail.owner?.name}</span>
            </div>
            <span className="thread-detail__time">
              {postedAt(threadDetail.createdAt)}
            </span>
          </div>
        </div>
        <div
          className="thread-detail__body"
          dangerouslySetInnerHTML={{ __html: threadDetail.body }}
        />
        <div className="thread-detail__actions">
          <VoteButton
            upVotesBy={threadDetail.upVotesBy}
            downVotesBy={threadDetail.downVotesBy}
            authUserId={authUser?.id}
            onUpVote={onUpVoteThread}
            onDownVote={onDownVoteThread}
          />
        </div>
      </article>

      <section className="thread-detail__comments">
        <h3 className="thread-detail__comments-title">
          Komentar ({threadDetail.comments.length})
        </h3>
        {authUser ? (
          <CommentInput onAddComment={onAddComment} />
        ) : (
          <p className="thread-detail__login-prompt">
            <a href="/login">Login</a> untuk memberi komentar.
          </p>
        )}
        <div className="thread-detail__comments-list">
          {threadDetail.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              {...comment}
              authUserId={authUser?.id}
              onUpVote={onUpVoteComment}
              onDownVote={onDownVoteComment}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ThreadDetailPage;
