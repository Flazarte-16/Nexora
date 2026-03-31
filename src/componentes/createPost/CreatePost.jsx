import { useState } from "react";
import "./CreatePost.css";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";
import { sileo } from "sileo";

export const CreatePost = ({ setIsLoading }) => {
  const [newPost, setNewPost] = useState({
    content: "",
    file: null,
  });
  const { user } = useAuth();
  const { setPosts } = usePost();
  const [imagePreview, setImagePreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", newPost.content);
      formData.append("file", newPost.file);

      const response = await fetch("http://localhost:3000/v1/posts/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.type === "EMPTY_INPUTS") {
        sileo.error({
          title: data.message,
          duration: 1000,
          fill: "#000000",
        });
        return;
      }

      setPosts((prevPosts) => [
        { ...data.newPost, user: { ...user } },
        ...prevPosts,
      ]);
      setNewPost({ content: "", file: null });
      setImagePreview("");
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageFile = (e) => {
    const newFile = e.target.files[0];

    if (!newFile.type.startsWith("image/")) {
      sileo.error({
        title: "Please upload an image file.",
        duration: 1000,
        fill: "#000000",
      });
      setNewPost({
        content: "",
        file: null,
      });
      return;
    }

    const imageUrl = URL.createObjectURL(newFile);
    setImagePreview(imageUrl);
    setNewPost({
      ...newPost,
      file: newFile,
    });
  };

  const buttonClass = !newPost.content && "disabled";

  return (
    <form className="input-container-create" onSubmit={handleSubmit}>
      <section className="input-text">
        <img className="profile-image" src={user.image_url} alt="user image" />
        <input
          type="text"
          placeholder="What's happening?"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
      </section>
      <div className="input-post">
        {!imagePreview ? (
          <>
            <input
              type="file"
              className="file"
              id="file"
              accept="image/*"
              onChange={handleImageFile}
            />
            <label htmlFor="file" className="label">
              <ion-icon name="image"></ion-icon>{" "}
            </label>
          </>
        ) : (
          <img className="image-preview" src={imagePreview} alt="file image" />
        )}

        <button
          className={buttonClass}
          disabled={newPost.content ? false : true}
        >
          Post
        </button>
      </div>
    </form>
  );
};
