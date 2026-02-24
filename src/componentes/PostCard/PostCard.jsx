import "./PostCard.css";

export const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      <section className="card-header">
        <img src={post.profileImage} alt={`foto de ${post.username}`} />
        <section className="card-header-info">
          <h4>{post.name}</h4>
          <p>@{post.username}</p>
        </section>
      </section>
      <p className="post-card-content">{post.content}</p>
    </article>
  );
};
