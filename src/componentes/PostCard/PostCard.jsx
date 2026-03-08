import { useEffect, useState } from "react";
import "./PostCard.css";
import { Link } from "wouter";

export const PostCard = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/v1/comments/${post.id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [post.id]);

  return (
    <article className="post-card">
      <section className="card-header">
        <section className="card-header-left">
          <img src={post.user.image_url} alt={`foto de ${post.username}`} />
          <section className="card-header-info">
            <Link className="relocation-user" to={`/${post.user.username}`}>
              <h4>{post.user.full_name}</h4>
            </Link>
            <p>@{post.user.username}</p>
          </section>
        </section>
        <section className="card-header-right">
          <p>{post.time_ago}</p>
        </section>
      </section>
      <p className="post-card-content">
        {post.content.split(" ").map((word) =>
          word.startsWith("@") ? (
            <Link className="relocation-user mention" to={`/${word.slice(1)}`}>
              {" " + word}
            </Link>
          ) : (
            " " + word
          ),
        )}
      </p>
      <article className="post-card-actions">
        <button
          className="action-btn comments"
          onClick={() => setShowComments(!showComments)}
        >
          <ion-icon className="sidebar-icon" name="chatbox-sharp"></ion-icon>
          <span>{comments.length}</span>
        </button>
        <button className="action-btn likes">
          <ion-icon className="sidebar-icon" name="heart"></ion-icon>
        </button>
      </article>
      <section
        className={`post-card-comments ${showComments ? "show" : "hide"}`}
      >
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <img src={post.user.image_url} alt={`foto de ${post.username}`} />
            <p>{comment.content}</p>
          </div>
        ))}
      </section>
    </article>
  );
};
