import React from 'react';
import PropTypes from 'prop-types';

function CategoryFilter({ categories, activeCategory, onFilter }) {
  return (
    <div className="category-filter">
      <h4 className="category-filter__title">Kategori</h4>
      <div className="category-filter__list">
        <button
          type="button"
          className={`category-filter__item ${activeCategory === '' ? 'category-filter__item--active' : ''}`}
          onClick={() => onFilter('')}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={`category-filter__item ${activeCategory === category ? 'category-filter__item--active' : ''}`}
            onClick={() => onFilter(category)}
          >
            #{category}
          </button>
        ))}
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default CategoryFilter;
