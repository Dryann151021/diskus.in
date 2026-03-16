/**
 * Skenario pengujian ThreadItem component
 *
 * - ThreadItem component
 *   - should render thread title, body preview, category, and owner name
 *   - should render comment count and created time
 *   - should call onUpVote when up vote button is clicked
 *   - should call onDownVote when down vote button is clicked
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from './ThreadItem.jsx';

const fakeThread = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah isi thread pertama untuk pengujian',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  upVotesBy: ['users-2'],
  downVotesBy: [],
  totalComments: 5,
  owner: {
    name: 'John Doe',
    avatar: 'https://example.com/avatar.png',
  },
  authUserId: 'users-1',
};

describe('ThreadItem component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render thread title, body preview, category, and owner name', () => {
    // Arrange
    const mockUpVote = vi.fn();
    const mockDownVote = vi.fn();

    // Action
    render(
      <MemoryRouter>
        <ThreadItem
          {...fakeThread}
          onUpVote={mockUpVote}
          onDownVote={mockDownVote}
        />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('Thread Pertama')).toBeInTheDocument();
    expect(screen.getByText('#General')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render comment count', () => {
    // Arrange
    const mockUpVote = vi.fn();
    const mockDownVote = vi.fn();

    // Action
    render(
      <MemoryRouter>
        <ThreadItem
          {...fakeThread}
          onUpVote={mockUpVote}
          onDownVote={mockDownVote}
        />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should call onUpVote when up vote button is clicked', async () => {
    // Arrange
    const mockUpVote = vi.fn();
    const mockDownVote = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ThreadItem
          {...fakeThread}
          onUpVote={mockUpVote}
          onDownVote={mockDownVote}
        />
      </MemoryRouter>
    );

    // Action
    const upVoteButton = screen.getByLabelText('Up vote');
    await user.click(upVoteButton);

    // Assert
    expect(mockUpVote).toHaveBeenCalled();
  });

  it('should call onDownVote when down vote button is clicked', async () => {
    // Arrange
    const mockUpVote = vi.fn();
    const mockDownVote = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ThreadItem
          {...fakeThread}
          onUpVote={mockUpVote}
          onDownVote={mockDownVote}
        />
      </MemoryRouter>
    );

    // Action
    const downVoteButton = screen.getByLabelText('Down vote');
    await user.click(downVoteButton);

    // Assert
    expect(mockDownVote).toHaveBeenCalled();
  });
});
