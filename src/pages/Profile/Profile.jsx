import "./Profile.css";
import { useEffect, useState } from "react";
import { PostCard } from "../../componentes/PostCard/PostCard";
import { useParams } from "wouter";
import { ProfileSkeleton } from "../../componentes/Skeletons/Skeletons";

export const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/v1/posts/user/${params.username}`,
        );
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    const getUserInfo = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/v1/users/${params.username}`,
        );
        const data = await response.json();
        setUserInfo(data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
    getUserInfo();
  }, [params.username]);

  if (isLoading) return <ProfileSkeleton />;

  return (
    <main className="main main--profile">
      <section className="user-info">
        <section
          className="banner"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1542831371-29b0f74f9713?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZ3JhbWFjaW9ufGVufDB8fDB8fHww)",
          }}
        ></section>

        <article className="user-details">
          <img
            src={userInfo?.image_url}
            alt="Foto de perfil"
            className="user-img"
          />
          <h2 className="user-name">{userInfo.full_name}</h2>
          <h3 className="user-username">{userInfo.username}</h3>
          <p>{userInfo?.description}</p>
          <article className="profile-sections">
            <span>Seguidores: 0</span>
            <span>Siguiendo: 0</span>
            <span>Posts: {posts.length}</span>
          </article>
        </article>
      </section>
      <section className="posts-container--profile">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
};
