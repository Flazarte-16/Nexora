import { useEffect, useState } from "react";
import { PostCard } from "../PostCard/PostCard";
import "./List.css";

export const List = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://unfluent-sundrily-brent.ngrok-free.dev/v1/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  });

  return (
    <section className="list">
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </section>
  );
};
