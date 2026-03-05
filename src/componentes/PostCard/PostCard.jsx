import "./PostCard.css";
import { Link } from "wouter";

export const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      <section className="card-header">
        <img src={post.user.image_url} alt={`foto de ${post.username}`} />
        <section className="card-header-info">
          <Link href={`/${post.user.username}`}>
            <h4>{post.user.full_name}</h4>
          </Link>
          <p>@{post.user.username}</p>
        </section>
      </section>
      <p className="post-card-content">{post.content}</p>
      <article className="post-card-actions">
        <button className="action-btn comments">
          <ion-icon className="sidebar-icon" name="chatbox-sharp"></ion-icon>
        </button>
        <button className="action-btn likes">
          <ion-icon className="sidebar-icon" name="heart"></ion-icon>
        </button>
      </article>
    </article>
  );
};
