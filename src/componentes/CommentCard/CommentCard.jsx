import { Link } from "wouter";
import "./CommentCard.css";

export const CommentCard = ({ comment }) => {
  return (
    <article className="comment-card">
      <section className="card-header">
        <section className="card-header-left">
          <img
            src={comment.user.image_url}
            alt={`foto de ${comment.username}`}
          />
          <section className="card-header-info">
            <Link className="relocation-user" to={`/${comment.user.username}`}>
              <h4>{comment.user.full_name}</h4>
            </Link>
            <p>@{comment.user.username}</p>
          </section>
        </section>
        <section className="card-header-right">
          <p>{comment.time_ago}</p>
        </section>
      </section>
      <p className="card-content comment">{comment.content}</p>
    </article>
  );
};
