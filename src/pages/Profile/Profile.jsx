import "./Profile.css";
import { useContext, useEffect, useState } from "react";
import { PostCard } from "../../componentes/PostCard/PostCard";
import { Link, useLocation, useParams } from "wouter";
import { ProfileSkeleton } from "../../componentes/Skeletons/Skeletons";
import { UserFollowingContext } from "../../context/UserFollowingContext";
import { useAuth } from "../../hooks/useAuth";
import { sileo } from "sileo";

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
    description: "",
    profile_image: null,
    banner_image: null,
  });
  const [_, navigate] = useLocation();
  const [imageUrlPreview, setImageUrlPreview] = useState("");
  const [bannerUrlPreview, setBannerUrlPreview] = useState("");

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
    try {
      const formData = new FormData();
      formData.append("username", updateUserValues.username);
      formData.append("full_name", updateUserValues.full_name);
      formData.append("description", updateUserValues.description);
      formData.append("image_url", updateUserValues.profile_image);
      formData.append("banner_image_url", updateUserValues.banner_image);

      const response = await fetch("http://localhost:3000/v1/users/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();

      setUserInfo({ ...userInfo, ...data.updatedsInputs });

      const updatedUser = {
        ...userInfo,
        ...data.updatedsInputs,
      };

      setUser({ ...user, ...updatedUser });

      if (updatedUser.username) {
        navigate(`/${updatedUser.username}`);
      }

      setUpdateUserValues({
        username: "",
        full_name: "",
        description: "",
        profile_image: null,
        banner_image: null,
      });
      setModalIsOpen(!modalIsOpen);
    } catch (e) {
      console.log(e.message);
    } finally {
    }
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

  const handleImageUrlPreview = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      sileo.error({
        title: "Please upload an image file.",
        duration: 1000,
        fill: "#000000",
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    console.log(e.target.name);

    e.target.name === "banner_image"
      ? setBannerUrlPreview(imageUrl)
      : setImageUrlPreview(imageUrl);

    setUpdateUserValues({ ...updateUserValues, [e.target.name]: file });
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
        <section className="modal-header">
          <button
            className="btn-modal close"
            onClick={() => setModalIsOpen(false)}
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
          <h2 className="title l">Edit profile</h2>
          <button className="btn-modal save" onClick={handleUpdateUser}>
            Save
          </button>
        </section>
        <section className="image-profile-container">
          <section
            className="banner image-modal"
            style={{
              backgroundImage: `url(${bannerUrlPreview ? bannerUrlPreview : userInfo?.banner_image_url})`,
            }}
          >
            {!bannerUrlPreview && (
              <>
                <input
                  type="file"
                  onChange={handleImageUrlPreview}
                  name="banner_image"
                  id="banner_image_url_modal"
                  className="image_url_modal"
                />
                <label
                  className="btn-update-image"
                  htmlFor="banner_image_url_modal"
                >
                  <ion-icon name="camera-reverse-outline"></ion-icon>
                </label>
              </>
            )}
          </section>
        </section>
        <section className="input-container-modal">
          {imageUrlPreview ? (
            <img
              src={imageUrlPreview}
              alt="Foto de perfil"
              className="user-img modal-img"
            />
          ) : (
            <section className="user-img-container">
              <img
                src={userInfo?.image_url}
                alt="Foto de perfil"
                className="user-img modal-img"
              />
              <input
                type="file"
                id="image_url_modal"
                name="profile_image"
                className="image_url_modal"
                onChange={handleImageUrlPreview}
              />
              <label className="btn-update-image" htmlFor="image_url_modal">
                <ion-icon name="camera-reverse-outline"></ion-icon>
              </label>
            </section>
          )}

          <input
            onChange={handleInputValues}
            type="text"
            placeholder={userInfo.full_name}
            name="full_name"
            value={updateUserValues.full_name}
          />
          <input
            onChange={handleInputValues}
            type="text"
            placeholder={`@${userInfo.username}`}
            name="username"
            value={updateUserValues.username}
          />
          <textarea
            onChange={handleInputValues}
            name="description"
            placeholder={userInfo.description || "Description"}
            value={updateUserValues.description}
          ></textarea>
        </section>
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
