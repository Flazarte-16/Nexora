import "./Profile.css";
import { useContext, useEffect, useState } from "react";
import { PostCard } from "../../componentes/PostCard/PostCard";
import { useParams } from "wouter";
import { ProfileSkeleton } from "../../componentes/Skeletons/Skeletons";
import { UserFollowingContext } from "../../context/UserFollowingContext";

export const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(UserFollowingContext);
  const { followingList } = context;

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

  console.log("la lista cheta: ", followingList);

  if (isLoading) return <ProfileSkeleton />;

  return (
    <main className="main main--profile">
      <section className="user-info">
        <section
          className="banner"
          style={{ backgroundImage: `url(${userInfo?.banner_image_url})` }}
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
          <section className="user-details-bottom">
            <article className="profile-sections">
              <span>Followers: 0</span>
              <span>Following: 0</span>
              <span>Posts: {posts.length}</span>
            </article>
            <button className="Follow-button">Follow</button>
          </section>
        </article>
      </section>
      <section className="posts-container--profile">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
};
