import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { asyncPopulateUsersAndThreads } from '../states/shared/action.js';
import {
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncToggleNeutralVoteThread,
} from '../states/threads/action.js';
import ThreadsList from '../components/ThreadsList.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';

function ThreadSkeleton() {
  return (
    <div className="thread-item" style={{ padding: '1rem' }}>
      <Skeleton width={80} height={20} style={{ marginBottom: '0.5rem' }} />
      <Skeleton width="60%" height={24} style={{ marginBottom: '0.5rem' }} />
      <Skeleton count={2} style={{ marginBottom: '0.25rem' }} />
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
        <Skeleton width={50} height={20} />
        <Skeleton width={50} height={20} />
        <Skeleton width={80} height={20} />
      </div>
    </div>
  );
}

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const isLoading = useSelector((state) => state.isLoading);

  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = [...new Set(threads.map((thread) => thread.category))];

  const filteredThreads = activeCategory
    ? threads.filter((thread) => thread.category === activeCategory)
    : threads;

  const onUpVote = (threadId) => {
    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk melakukan vote.');
      return;
    }
    const thread = threads.find((t) => t.id === threadId);
    if (thread.upVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralVoteThread(threadId));
    } else {
      dispatch(asyncToggleUpVoteThread(threadId));
    }
  };

  const onDownVote = (threadId) => {
    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk melakukan vote.');
      return;
    }
    const thread = threads.find((t) => t.id === threadId);
    if (thread.downVotesBy.includes(authUser.id)) {
      dispatch(asyncToggleNeutralVoteThread(threadId));
    } else {
      dispatch(asyncToggleDownVoteThread(threadId));
    }
  };

  return (
    <div className="home-page">
      <aside className="home-page__sidebar">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onFilter={setActiveCategory}
        />
      </aside>
      <main className="home-page__content">
        <h2 className="home-page__title">Diskusi Terbaru</h2>
        {isLoading && threads.length === 0 ? (
          <div className="threads-skeleton">
            <ThreadSkeleton />
            <ThreadSkeleton />
            <ThreadSkeleton />
          </div>
        ) : (
          <ThreadsList
            threads={filteredThreads}
            users={users}
            authUserId={authUser?.id}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        )}
      </main>
    </div>
  );
}

export default HomePage;
