import { useEffect, useState } from "react";
import { CommentCard } from "../CommentCard/CommentCard";
import "./PostCommentList.css";
import { useAuth } from "../../hooks/useAuth";

export const PostCommentList = ({ post_id, showComments, setCantComments }) => {
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3000/v1/posts/${post_id}/comment/`,
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
    setCantComments((prev) => prev + 1);
    setCommentContent("");
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:3000/v1/comments/${post_id}`,
      );
      const data = await response.json();
      setComments(data.comments);
    };

    getData();
  }, [post_id]);

  return (
    <section className={`post-card-comments ${showComments ? "show" : "hide"}`}>
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
      <section className="comments-container">
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </section>
    </section>
  );
};
