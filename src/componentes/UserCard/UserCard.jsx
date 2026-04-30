import { Link } from "wouter";
import "./UserCard.css";
import { UserFollowingContext } from "../../context/UserFollowingContext";
import { useContext } from "react";
import { useAuth } from "../../hooks/useAuth";

export const UserCard = ({ u, variant }) => {
  const { user } = useAuth();
  const context = useContext(UserFollowingContext);
  const { followingList, setFollowingList } = context;

  const handleFollow = async () => {
    const response = await fetch(
      `http://localhost:3000/v1/users/follow/${u.username}`,
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
    } else if (data.type === "removed") {
      setFollowingList((prev) =>
        [...prev].filter(
          (uf) => uf.id_user_following !== data.userFollower.id_user_following,
        ),
      );
    }
  };

  const textFollowBtn = followingList.some(
    (uf) => uf.id_user_following === u.id,
  )
    ? "Following"
    : "Follow";

  return (
    <>
      <div
        className={`profiles ${variant === "extend" && "profiles--explore"}`}
      >
        <section className="profile-left">
          <img src={u.image_url} alt={`${u.username} image`} />
          <section className="profile-info">
            <Link className="relocation-user" to={`/${u.username}`}>
              <h4>{u.full_name}</h4>
            </Link>
            <p className="profile-username">@{u.username}</p>
            <p className="profile-card-description">
              {variant === "extend" && u.description}
            </p>
          </section>
        </section>
        {user.id !== u.id && (
          <button className="follow-button" onClick={handleFollow}>
            {textFollowBtn}
          </button>
        )}
      </div>
    </>
  );
};
