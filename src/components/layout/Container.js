import { React } from 'react';
import P from 'prop-types';
import styles from './Container.module.css';

function Container(props) {
  return <div className={`${styles.container} ${styles[props.customClass]}`}>{props.children}</div>;
}

export default Container;

Container.propTypes = {
  customClass: P.styles,
  children: P.func,
};
