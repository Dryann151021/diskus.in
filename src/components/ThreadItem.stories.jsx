import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from './ThreadItem.jsx';

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
};

const defaultArgs = {
  id: 'thread-1',
  title: 'Bagaimana cara belajar React dengan cepat?',
  body: 'Saya ingin mempelajari React JS tapi bingung mulai dari mana. Ada saran?',
  category: 'Tech',
  createdAt: new Date().toISOString(),
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 3,
  owner: {
    name: 'Dicoding User',
    avatar: 'https://ui-avatars.com/api/?name=Dicoding+User&background=random',
  },
  authUserId: 'user-1',
  onUpVote: (id) => alert(`Upvote thread: ${id}`),
  onDownVote: (id) => alert(`Downvote thread: ${id}`),
};

export const Default = {
  args: {
    ...defaultArgs,
  },
};

export const Upvoted = {
  args: {
    ...defaultArgs,
    upVotesBy: ['user-1', 'user-2', 'user-3'],
  },
};

export const WithoutOwner = {
  args: {
    ...defaultArgs,
    owner: null,
  },
};
