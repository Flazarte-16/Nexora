import "./Profile.css";
import { useContext, useEffect, useState } from "react";
import { PostCard } from "../../componentes/PostCard/PostCard";
import { Link, useLocation, useParams } from "wouter";
import { ProfileSkeleton } from "../../componentes/Skeletons/Skeletons";
import { UserFollowingContext } from "../../context/UserFollowingContext";
import { useAuth } from "../../hooks/useAuth";

export const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const { user, setUser } = useAuth();
  const params = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(UserFollowingContext);
  const { followingList, setFollowingList } = context;
  const [updateUserValues, setUpdateUserValues] = useState({
    username: "",
    full_name: "",
  });
  const [_, navigate] = useLocation();

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

  const handleUpdateUser = async () => {
    const response = await fetch("http://localhost:3000/v1/users/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        username: updateUserValues.username,
        full_name: updateUserValues.full_name,
      }),
    });

    const data = await response.json();

    alert(data.message);

    setUserInfo({ ...userInfo, ...data.updatedsInputs });

    const updatedUser = {
      ...userInfo,
      ...data.updatedsInputs,
    };

    setUser({ ...user, ...updatedUser });

    if (updatedUser.username) {
      navigate(`/${updatedUser.username}`);
    }

    setModalIsOpen(!modalIsOpen);
  };

  useEffect(() => {
    if (!userInfo) return;

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

  const handleInputValues = (e) => {
    setUpdateUserValues({
      ...updateUserValues,
      [e.target.name]: e.target.value,
    });
  };

  const textFollowBtn = followingList.some(
    (uf) => uf.id_user_following === userInfo?.id,
  )
    ? "Following"
    : "Follow";

  if (isLoading) return <ProfileSkeleton />;

  if (!userInfo) {
    return (
      <main className="main main--not-found">
        <img src="public/nexora-logo-broken.png" alt="image not found" />
        <h2 className="title-not-found">Sorry, this page isn't available.</h2>
        <p className="subtitle-not-found">
          The link you followed may be broken, or the page may have been
          removed.{" "}
          <Link className="relocate-not-found" to="/home">
            Go back to Nexora home page
          </Link>
          .
        </p>
      </main>
    );
  }

  const modalClassName = modalIsOpen && "active";

  return (
    <main className={`main main--profile ${modalClassName}`}>
      <section className={`modal modal--edit ${modalClassName}`}>
        <h2 className="title l">Edit profile</h2>
        <section className="input-container-modal">
          <input
            onChange={handleInputValues}
            type="text"
            placeholder={userInfo.full_name}
            name="full_name"
          />
          <input
            onChange={handleInputValues}
            type="text"
            placeholder={`@${userInfo.username}`}
            name="username"
          />
        </section>
        <button className="btn-modal" onClick={handleUpdateUser}>
          Edit
        </button>
        <button
          className="btn-modal edit"
          onClick={() => setModalIsOpen(!modalIsOpen)}
        >
          Close
        </button>
      </section>
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
          <h3 className="user-username">@{userInfo.username}</h3>
          <p>{userInfo?.description}</p>
          <section className="user-details-bottom">
            <article className="profile-sections">
              <span>Followers: {userInfo.cant_followers}</span>
              <span>Posts: {posts.length}</span>
            </article>
            {userInfo.id === user.id ? (
              <button
                onClick={() => setModalIsOpen(!modalIsOpen)}
                className="edit-button"
              >
                Edit profile
              </button>
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
