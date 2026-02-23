import "./CreatePost.css";

export const CreatePost = () => {
  return (
    <div className="input-container">
      <div className="input-text">
        <img src="marcus.png" alt="user image" />
        <input type="text" placeholder="What's happening?" />
      </div>
      <div className="input-post">
        <ion-icon name="image"></ion-icon>
        <button>Post</button>
      </div>
    </div>
  );
};
