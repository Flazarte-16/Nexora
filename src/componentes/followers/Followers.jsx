import { useContext, useEffect, useState } from "react";
import "./Followers.css";
import { Link } from "wouter";
import { UserCard } from "../UserCard/UserCard";

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
      <h2>Suggested for you</h2>
      {users &&
        users.length > 0 &&
        users.map((user) => <UserCard u={user} key={user.id} />)}
    </div>
  );
};
