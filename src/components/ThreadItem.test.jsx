import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from './ThreadItem.jsx';

const fakeThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah body dari thread pertama yang cukup panjang',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 5,
  owner: {
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  authUserId: 'user-1',
};

describe('ThreadItem component', () => {
  it('should render thread title, category, and body preview', () => {
    render(
      <MemoryRouter>
        <ThreadItem {...fakeThread} onUpVote={() => {}} onDownVote={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Thread Pertama')).toBeInTheDocument();
    expect(screen.getByText('#General')).toBeInTheDocument();
    expect(
      screen.getByText('Ini adalah body dari thread pertama yang cukup panjang')
    ).toBeInTheDocument();
  });

  it('should render owner name and total comments', () => {
    render(
      <MemoryRouter>
        <ThreadItem {...fakeThread} onUpVote={() => {}} onDownVote={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should call onUpVote and onDownVote handlers when vote buttons are clicked', async () => {
    const mockUpVote = vi.fn();
    const mockDownVote = vi.fn();

    render(
      <MemoryRouter>
        <ThreadItem
          {...fakeThread}
          onUpVote={mockUpVote}
          onDownVote={mockDownVote}
        />
      </MemoryRouter>
    );

    const upVoteButton = screen.getByRole('button', { name: 'Up vote' });
    const downVoteButton = screen.getByRole('button', { name: 'Down vote' });
    await userEvent.click(upVoteButton);
    await userEvent.click(downVoteButton);
    expect(mockUpVote).toHaveBeenCalledWith('thread-1');
    expect(mockDownVote).toHaveBeenCalledWith('thread-1');
  });
});
