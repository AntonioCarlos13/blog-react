import { React } from 'react';
import P from 'prop-types';
import styles from './Input.module.css';

export const Input = ({ handleChange, searchValue }) => {
  return (
    <input
      className={styles.search_container}
      onChange={handleChange}
      value={searchValue}
      type="search"
      placeholder="Pesquisar este blog"
    />
  );
};

Input.propTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
