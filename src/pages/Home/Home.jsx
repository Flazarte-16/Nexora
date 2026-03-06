import { useEffect, useState } from "react";
import { CreatePost } from "../../componentes/CreatePost/CreatePost";
import "./Home.css";
import "ionicons";
import { PostCard } from "../../componentes/PostCard/PostCard";
import { PostCardSkeleton } from "../../componentes/Skeletons/Skeletons";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/v1/posts");
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, []);

  return (
    <main className="main main--home">
      <CreatePost />
      <section className="posts-container">
        {!isLoading ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        )}
      </section>
    </main>
  );
};
