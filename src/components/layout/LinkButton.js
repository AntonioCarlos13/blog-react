import styles from "./LinkButton.module.css";

export const LinkButton = ({ text, onClick, disabled }) => (
  <button className={styles.btn} onClick={onClick} disabled={disabled}>
    {text}
  </button>
);
