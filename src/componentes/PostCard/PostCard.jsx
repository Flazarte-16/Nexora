import { useEffect, useState } from "react";
import "./PostCard.css";
import { Link } from "wouter";
import { useAuth } from "../../hooks/useAuth";
import { CommentCard } from "../CommentCard/CommentCard";

export const PostCard = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [likes, setLikes] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:3000/v1/likes/${post.id}`);
      const data = await response.json();
      setLikes(data.likes);
    };
    getData();
  }, [post.id]);

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

  const handleLike = async () => {
    const user_id = user.id;

    try {
      await fetch("http://localhost:3000/v1/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, post_id: post.id }),
      });

      const res = await fetch(`http://localhost:3000/v1/likes/${post.id}`);
      const data = await res.json();

      console.log("likes after like:", data);

      setLikes(data.likes);
      alert("Posteo Likeado");
    } catch (error) {
      console.error(error);
    }
  };

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

    if (data.type === "EMPTY_INPUTS") {
      alert(data.message);
      return;
    }

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
      <p className="card-content">
        {post.content.split(" ").map((word) =>
          word.startsWith("@") ? (
            <Link
              key={word}
              className="relocation-user mention"
              to={`/${word.slice(1)}`}
            >
              {" " + word}
            </Link>
          ) : word.startsWith("#") ? (
            <span key={word} className="hashtag">
              {" " + word}
            </span>
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
        <button className="action-btn likes" onClick={handleLike}>
          <ion-icon className="sidebar-icon" name="heart"></ion-icon>
          <span>{likes}</span>
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
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </section>
    </article>
  );
};
