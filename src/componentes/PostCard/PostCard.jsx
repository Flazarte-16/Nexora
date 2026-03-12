import { useEffect, useState } from "react";
import "./PostCard.css";
import { Link } from "wouter";
import { useAuth } from "../../hooks/useAuth";

export const PostCard = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:3000/v1/comments/${post.id}`,
      );
      const data = await response.json();
      setComments(data.comments);
    };
    getData();
  }, [post.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3000/v1/posts/${post.id}/comment/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: commentContent }),
      },
    );
    const data = await response.json();
    setComments((prev) => [{ ...data.newComment, user: { ...user } }, ...prev]);
    setCommentContent("");
  };

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
          ) : word.startsWith("#") ? (
            <p className="hashtag">{" " + word}</p>
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
        <form className="form-comment" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button>
            <ion-icon name="send-outline"></ion-icon>
          </button>
        </form>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <section className="card-header">
              <section className="card-header-left">
                <img
                  src={comment.user.image_url}
                  alt={`foto de ${comment.username}`}
                />
                <section className="card-header-info">
                  <Link
                    className="relocation-user"
                    to={`/${comment.user.username}`}
                  >
                    <h4>{comment.user.full_name}</h4>
                  </Link>
                  <p>@{comment.user.username}</p>
                </section>
              </section>
            </section>
            <p>{comment.content}</p>
          </div>
        ))}
      </section>
    </article>
  );
};
