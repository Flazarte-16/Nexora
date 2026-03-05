import "./PostCard.css";
import { Link } from "wouter";

export const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      <section className="card-header">
        <img src={post.user.image_url} alt={`foto de ${post.username}`} />
        <section className="card-header-info">
          <Link href={`/profile/${post.userId}`}>
            <h4>{post.user.full_name}</h4>
          </Link>
          <p>@{post.user.username}</p>
        </section>
      </section>
      <p className="post-card-content">{post.content}</p>
      <article>
        <span className="post-card-actions">
          <ion-icon
            id="coments"
            className="sidebar-icon"
            name="chatbox-sharp"
          ></ion-icon>
          <ion-icon id="likes" className="sidebar-icon" name="heart"></ion-icon>
        </span>
      </article>
    </article>
  );
};
