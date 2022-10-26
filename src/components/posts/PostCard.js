function PostCard({ cover, title, id, body }) {
  return (
    <div className="post">
      <img src={cover} alt={title} />
      <div className="post_content">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
}

export default PostCard;
