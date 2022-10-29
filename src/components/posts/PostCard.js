import styles from "./PostCard.module.css";

export const PostCard = ({ cover, title, id, body }) => (
  <div className={styles.post}>
    <img src={cover} alt={title} />
    <div className={styles.post_content}>
      <h2>
        {title}
        {id}
      </h2>
      <p>{body}</p>
    </div>
  </div>
);
