import { React } from 'react';
import P from 'prop-types';
import styles from './LinkButton.module.css';

export const LinkButton = ({ text, onClick, disabled = false }) => (
  <button className={styles.btn} onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

LinkButton.defaultProps = {
  disabled: false,
};

LinkButton.propTypes = {
  text: P.string.isRequired,
  onClick: P.func.isRequired,
  disabled: P.bool,
};
