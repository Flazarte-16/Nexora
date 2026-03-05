import { Followers } from "../Followers/Followers";
import { Link, useLocation } from "wouter";
import "./SideBar.css";
import "ionicons";

export const SideBar = () => {
  const [location] = useLocation();

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
        <div className="sidebar-item">
          <ion-icon className="sidebar-icon" name="compass-sharp"></ion-icon>
          <p>Explore</p>
        </div>
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
          to="/flazarte"
          className={`sidebar-item ${location === "/profile" && "active"}`}
        >
          <ion-icon
            className="sidebar-icon"
            name="person-circle-sharp"
          ></ion-icon>
          <p>Profile</p>
        </Link>
      </div>
      <div className="profile">
        <img src="marcus.png" alt="your profile image" />
        <p>Marcus Aurelius</p>
      </div>
    </div>
  );
};

export const RightSidebar = () => {
  return (
    <section className="sidebar-container sidebar-container--right">
      <input type="text" placeholder="search..." name="search" />
      <Followers />
    </section>
  );
};
