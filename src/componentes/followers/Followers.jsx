import { useContext, useEffect, useState } from "react";
import "./Followers.css";
import { Link } from "wouter";

export const Followers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getRandomUsers = async () => {
      const response = await fetch("http://localhost:3000/v1/users/random", {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      setUsers(data.users);
    };

    getRandomUsers();
  }, []);

  return (
    <div className="profiles-container">
      <h2>Profiles for you</h2>
      {users &&
        users.length > 0 &&
        users.map((user) => (
          <div className="profiles">
            <img src={user.image_url} alt={`${user.username} image`} />
            <section className="profile-info">
              <Link className="relocation-user" to={`/${user.username}`}>
                <h4>{user.full_name}</h4>
              </Link>
              <p className="profile-username">{user.username}</p>
            </section>
            <button className="Follow-button">Follow</button>
          </div>
        ))}
    </div>
  );
};
