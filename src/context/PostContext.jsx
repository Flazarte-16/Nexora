import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

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
  }, [user]);

  return (
    <PostContext.Provider value={{ posts, setPosts, isLoading }}>
      {children}
    </PostContext.Provider>
  );
};
