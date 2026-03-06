import { useContext, useState } from "react";
import "./CreatePost.css";
import { AuthContext } from "../../context/AuthContext";

export const CreatePost = () => {
  const [postContent, setPostContent] = useState("");
  const context = useContext(AuthContext);
  const { user } = context;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/v1/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
        <img src={user.image_url} alt="user image" />
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
