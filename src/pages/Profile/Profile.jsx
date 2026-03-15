import "./Profile.css";
import { useContext, useEffect, useState } from "react";
import { PostCard } from "../../componentes/PostCard/PostCard";
import { useParams } from "wouter";
import { ProfileSkeleton } from "../../componentes/Skeletons/Skeletons";
import { UserFollowingContext } from "../../context/UserFollowingContext";
import { useAuth } from "../../hooks/useAuth";

export const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const { user } = useAuth();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(UserFollowingContext);
  const { followingList, setFollowingList } = context;

  const handleFollow = async () => {
    const response = await fetch(
      `http://localhost:3000/v1/users/follow/${params.username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    const data = await response.json();
    if (data.type === "added") {
      setFollowingList((prev) => [...prev, { ...data.userFollower }]);
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        cant_followers: prevUserInfo.cant_followers + 1,
      }));
    } else if (data.type === "removed") {
      setFollowingList((prev) =>
        [...prev].filter(
          (uf) =>
            uf.id_user_follower !== data.userFollower.id_user_follower &&
            uf.id_user_following !== data.userFollower.id_user_following,
        ),
      );
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        cant_followers: prevUserInfo.cant_followers - 1,
      }));
    }

    alert(data.message);
  };

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

  const textFollowBtn = followingList.some(
    (uf) => uf.id_user_following === userInfo.id,
  )
    ? "Following"
    : "Follow";

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
              <span>Followers: {userInfo.cant_followers}</span>
              <span>Posts: {posts.length}</span>
            </article>
            {userInfo.id === user.id ? (
              <button className="edit-button">Edit profile</button>
            ) : (
              <button
                className="follow-button follow-button--profile"
                onClick={handleFollow}
              >
                {textFollowBtn}
              </button>
            )}
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
