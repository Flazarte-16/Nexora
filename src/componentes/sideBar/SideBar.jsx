import { Followers } from "../Followers/Followers";
import { Link, useLocation } from "wouter";
import "./SideBar.css";
import "ionicons";
import { useAuth } from "../../hooks/useAuth";
import { useContext } from "react";
import { NotificationsContext } from "../../context/NotificationsContext";

export const SideBar = () => {
  const [location, navigate] = useLocation();
  const { user, logout } = useAuth();
  const context = useContext(NotificationsContext);
  const { notifications } = context;
  const pendingNotifications = notifications.reduce(
    (acum, el) => (el.is_read === false ? acum + 1 : acum),
    0,
  );

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
        <Link
          to="/notifications"
          className={`sidebar-item ${
            location === "/notifications" && "active"
          }`}
        >
          <ion-icon
            className="sidebar-icon"
            name="notifications-sharp"
          ></ion-icon>
          <p>Notifications</p>
          {pendingNotifications > 0 && <span>{pendingNotifications}</span>}
        </Link>
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
  return (
    <section className="sidebar-container sidebar-container--right">
      <Followers />
    </section>
  );
};
