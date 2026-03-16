/**
 * Skenario pengujian CategoryFilter component
 *
 * - CategoryFilter component
 *   - should render all categories and "Semua" button
 *   - should call onFilter when a category is clicked
 *   - should show active class on selected category
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryFilter from './CategoryFilter.jsx';

describe('CategoryFilter component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render all categories and "Semua" button', () => {
    // Arrange
    const categories = ['General', 'Tech', 'Random'];
    const mockOnFilter = vi.fn();

    // Action
    render(
      <CategoryFilter
        categories={categories}
        activeCategory=""
        onFilter={mockOnFilter}
      />
    );

    // Assert
    expect(screen.getByText('Semua')).toBeInTheDocument();
    expect(screen.getByText('#General')).toBeInTheDocument();
    expect(screen.getByText('#Tech')).toBeInTheDocument();
    expect(screen.getByText('#Random')).toBeInTheDocument();
  });

  it('should call onFilter when a category is clicked', async () => {
    // Arrange
    const categories = ['General', 'Tech'];
    const mockOnFilter = vi.fn();
    const user = userEvent.setup();

    render(
      <CategoryFilter
        categories={categories}
        activeCategory=""
        onFilter={mockOnFilter}
      />
    );

    // Action
    await user.click(screen.getByText('#Tech'));

    // Assert
    expect(mockOnFilter).toHaveBeenCalledWith('Tech');
  });

  it('should show active class on selected category', () => {
    // Arrange
    const categories = ['General', 'Tech'];
    const mockOnFilter = vi.fn();

    // Action
    render(
      <CategoryFilter
        categories={categories}
        activeCategory="Tech"
        onFilter={mockOnFilter}
      />
    );

    // Assert
    const techButton = screen.getByText('#Tech');
    expect(techButton.className).toContain('category-filter__item--active');

    const semuaButton = screen.getByText('Semua');
    expect(semuaButton.className).not.toContain(
      'category-filter__item--active'
    );
  });
});
