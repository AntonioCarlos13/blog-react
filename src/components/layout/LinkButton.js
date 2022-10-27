import styles from "./LinkButton.module.css";

function LinkButton({ text, to, disabled }) {
  return (
    <button className={styles.btn} onClick={to} disabled={disabled}>
      {text}
    </button>
  );
}

export default LinkButton;
