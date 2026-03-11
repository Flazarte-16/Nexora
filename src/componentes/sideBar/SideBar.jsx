import { Followers } from "../Followers/Followers";
import { Link, useLocation } from "wouter";
import "./SideBar.css";
import "ionicons";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";

export const SideBar = () => {
  const [location, navigate] = useLocation();
  const { user, logout } = useAuth();

  const handleLogoutClick = () => {
    const response = logout();
    if (response.type === "OK") {
      navigate("/");
      alert(response.message);
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <img src="nexoraLogo.png" alt="nexora logo" className="nexora-logo" />
      </div>
      <div className="item-container">
        <Link
          to="/home"
          className={`sidebar-item ${location === "/home" && "active"}`}
        >
          <ion-icon className="sidebar-icon" name="home-sharp"></ion-icon>
          <p>Home</p>
        </Link>
        <Link
          to="/explore"
          className={`sidebar-item ${location === "/explore" && "active"}`}
        >
          <ion-icon className="sidebar-icon" name="compass-sharp"></ion-icon>
          <p>Explore</p>
        </Link>
        <div className="sidebar-item">
          <ion-icon
            className="sidebar-icon"
            name="notifications-sharp"
          ></ion-icon>
          <p>Notifications</p>
        </div>
        <div className="sidebar-item">
          <ion-icon className="sidebar-icon" name="chatbox-sharp"></ion-icon>
          <p>Messages</p>
        </div>
        <Link
          to={`/${user.username}`}
          className={`sidebar-item ${
            location === `/${user.username}` && "active"
          }`}
        >
          <ion-icon
            className="sidebar-icon"
            name="person-circle-sharp"
          ></ion-icon>
          <p>Profile</p>
        </Link>
        <div className="sidebar-item" onClick={handleLogoutClick}>
          <ion-icon className="sidebar-icon" name="log-out-outline"></ion-icon>
          <p>Log out</p>
        </div>
      </div>

      <div className="profile">
        <img src={user.image_url} alt="your profile image" />
        <h4 className="profile-name">{user.full_name}</h4>
      </div>
    </div>
  );
};

export const RightSidebar = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [location] = useLocation();

  const handleUserSearch = (e) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    if (!username) {
      setUsers([]);
      return;
    }

    const getData = setTimeout(async () => {
      const response = await fetch(
        `http://localhost:3000/v1/users?username=${username}`,
      );

      const data = await response.json();
      setMessage(data.message);
      setUsers(data.user);
    }, 400);

    return () => clearTimeout(getData);
  }, [username]);

  const isListActive = users.length > 0 ? "active" : "disabled";

  const handleRelocation = () => setUsername("");

  return (
    <section
      className={`sidebar-container sidebar-container--right ${isListActive}`}
    >
      <section className="search-container">
        {location !== "/explore" && (
          <input
            type="text"
            placeholder="search..."
            onChange={handleUserSearch}
            value={username}
          />
        )}
        <section className={`users-list ${isListActive}`}>
          {users.length > 0 ? (
            users.map((u) => (
              <div className="profiles">
                <img src={u.image_url} alt={`${u.username} image`} />
                <section className="profile-info">
                  <Link
                    onClick={handleRelocation}
                    className="relocation-user"
                    to={`/${u.username}`}
                  >
                    <h4>{u.full_name}</h4>
                  </Link>
                  <p className="profile-username">{u.username}</p>
                </section>
                <button className="Follow-button">Follow</button>
              </div>
            ))
          ) : (
            <p>{message}</p>
          )}
        </section>
      </section>
      <Followers />
    </section>
  );
};
