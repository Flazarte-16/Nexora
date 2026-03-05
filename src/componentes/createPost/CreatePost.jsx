import { useState } from "react";
import "./CreatePost.css";

export const CreatePost = () => {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/v1/posts/user/1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: postContent }),
      });

      const data = await response.json();

      alert(data.message);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <form className="input-container-create" onSubmit={handleSubmit}>
      <section className="input-text">
        <img src="marcus.png" alt="user image" />
        <input
          type="text"
          placeholder="What's happening?"
          onChange={(e) => setPostContent(e.target.value)}
        />
      </section>
      <div className="input-post">
        <ion-icon name="image"></ion-icon>
        <button>Post</button>
      </div>
    </form>
  );
};
