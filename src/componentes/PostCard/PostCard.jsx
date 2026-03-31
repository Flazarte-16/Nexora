import { useEffect, useState } from "react";
import "./PostCard.css";
import { Link } from "wouter";
import { useAuth } from "../../hooks/useAuth";
import { PostCommentList } from "../PostCommentList/PostCommentList";

export const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [cantLikes, setCantLikes] = useState(post.cant_likes);
  const [cantComments, setCantComments] = useState(post?.cant_comments);
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

      const { postLike } = data;

      if (data.type === "added") {
        setLikedPosts((prev) => [...prev, { ...data.postLike }]);
      } else if (data.type === "removed") {
        setLikedPosts((prev) =>
          [...prev].filter((p) => p.post_id !== postLike.post_id),
        );
      }

      setCantLikes(data.newPostCantLikes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getLikedPosts = async () => {
      const response = await fetch(
        `http://localhost:3000/v1/users/${user.id}/likes`,
      );
      const data = await response.json();
      setLikedPosts(data.likedPosts);
    };

    getLikedPosts();
  }, [post.id]);

  let likeButtonActive = likedPosts.some((p) => Number(p.post_id) === post.id)
    ? "active"
    : "disabled";

  const formattedContent = (content) => {
    const words = content.split(" ");
    return words.map((word) => {
      if (word.startsWith("@")) {
        return (
          <Link
            key={word}
            className="relocation-user mention"
            to={`/${word.slice(1)}`}
          >
            {" " + word}
          </Link>
        );
      } else if (word.startsWith("#")) {
        return (
          <span key={word} className="hashtag">
            {" " + word}
          </span>
        );
      } else {
        return " " + word;
      }
    });
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
      <p className="card-content">{formattedContent(post.content)}</p>
      {post.image_url && (
        <img className="post-image_url" src={post.image_url} alt="image post" />
      )}
      <article className="post-card-actions-container">
        <article className="post-card-actions">
          <button
            className="action-btn comments"
            onClick={() => setShowComments(!showComments)}
          >
            <ion-icon className="sidebar-icon" name="chatbox-sharp"></ion-icon>
          </button>
          <p>{cantComments || 0}</p>
        </article>
        <article className="post-card-actions">
          <button
            className={`action-btn likes ${likeButtonActive}`}
            onClick={handleLike}
          >
            <ion-icon className="sidebar-icon" name="heart"></ion-icon>
          </button>
          <p>{cantLikes || 0}</p>
        </article>
      </article>
      <PostCommentList
        post_id={post.id}
        showComments={showComments}
        setCantComments={setCantComments}
      />
    </article>
  );
};
