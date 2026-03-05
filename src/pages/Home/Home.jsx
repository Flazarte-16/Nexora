import { useEffect, useState } from "react";
import { CreatePost } from "../../componentes/CreatePost/CreatePost";
import "./Home.css";
import "ionicons";
import { PostCard } from "../../componentes/PostCard/PostCard";

export const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/v1/posts");
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, []);

  return (
    <main className="main main--home">
      <CreatePost />
      <section className="posts-container">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
};
