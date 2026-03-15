import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action.js';
import {
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncToggleNeutralVoteThread,
} from '../states/threads/action.js';
import ThreadsList from '../components/ThreadsList.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

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
        <ThreadsList
          threads={filteredThreads}
          users={users}
          authUserId={authUser?.id}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </main>
    </div>
  );
}

export default HomePage;
