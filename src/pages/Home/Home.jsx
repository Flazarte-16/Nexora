import { useEffect, useState } from "react";
import { CreatePost } from "../../componentes/CreatePost/CreatePost";
import "./Home.css";
import "ionicons";
import { PostCard } from "../../componentes/PostCard/PostCard";
import { PostCardSkeleton } from "../../componentes/Skeletons/Skeletons";
import { usePost } from "../../hooks/usePost";

export const Home = () => {
  const { posts, isLoading } = usePost();

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
