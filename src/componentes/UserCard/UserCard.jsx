import { Link } from "wouter";
import "./UserCard.css";
import { UserFollowingContext } from "../../context/UserFollowingContext";
import { useContext } from "react";

export const UserCard = ({ user }) => {
  const context = useContext(UserFollowingContext);
  const { followingList, setFollowingList } = context;

  const handleFollow = async () => {
    const response = await fetch(
      `http://localhost:3000/v1/users/follow/${user.username}`,
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
          (uf) =>
            uf.id_user_follower !== data.userFollower.id_user_follower &&
            uf.id_user_following !== data.userFollower.id_user_following,
        ),
      );
    }

    alert(data.message);
  };

  const textFollowBtn = followingList.some(
    (uf) => uf.id_user_following === user.id,
  )
    ? "Following"
    : "Follow";

  return (
    <div className="profiles">
      <section className="profile-left">
        <img src={user.image_url} alt={`${user.username} image`} />
        <section className="profile-info">
          <Link className="relocation-user" to={`/${user.username}`}>
            <h4>{user.full_name}</h4>
          </Link>
          <p className="profile-username">@{user.username}</p>
        </section>
      </section>
      <button className="follow-button" onClick={handleFollow}>
        {textFollowBtn}
      </button>
    </div>
  );
};
