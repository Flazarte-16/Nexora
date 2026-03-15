import { useEffect, useState } from "react";
import "./PostCard.css";
import { Link } from "wouter";
import { useAuth } from "../../hooks/useAuth";
import { CommentCard } from "../CommentCard/CommentCard";

export const PostCard = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [cantLikes, setCantLikes] = useState(post.cant_likes);
  const [likedPosts, setLikedPosts] = useState([]);
  const { user } = useAuth();

  const handleLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/v1/likes/${post.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await response.json();
      alert(data.message);

      if (data.type === "added") {
        setLikedPosts((prev) => [...prev, { ...data.postLike }]);
      } else if (data.type === "removed") {
        setLikedPosts((prev) => [...prev].filter((p) => p.post_id !== post.id));
      }

      setCantLikes(data.newPostCantLikes);
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

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:3000/v1/comments/${post.id}`,
      );
      const data = await response.json();
      setComments(data.comments);
    };

    const getLikedPosts = async () => {
      const response = await fetch(
        `http://localhost:3000/v1/users/${user.id}/likes`,
      );
      const data = await response.json();
      setLikedPosts(data.likedPosts);
    };

    getData();
    getLikedPosts();
  }, [post.id]);

  const likeButtonActive =
    likedPosts.some((p) => Number(p.post_id) === post.id) && "active";

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
      <article className="post-card-actions-container">
        <article className="post-card-actions">
          <button
            className="action-btn comments"
            onClick={() => setShowComments(!showComments)}
          >
            <ion-icon className="sidebar-icon" name="chatbox-sharp"></ion-icon>
          </button>
          <p>{comments.length}</p>
        </article>
        <article className="post-card-actions">
          <button
            className={`action-btn likes ${likeButtonActive}`}
            onClick={handleLike}
          >
            <ion-icon className="sidebar-icon" name="heart"></ion-icon>
          </button>
          <p>{cantLikes}</p>
        </article>
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
