import "./SideBar.css";
import "ionicons";

export const SideBar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <img src="nexoraLogo.png" alt="nexora logo" className="nexora-logo" />
      </div>
      <div className="item-container">
        <div className="sidebar-item">
          <ion-icon className="sidebar-icon" name="home-sharp"></ion-icon>
          <a href="/home">
            <p>Home</p>
          </a>
        </div>
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
        <div className="sidebar-item">
          <ion-icon
            className="sidebar-icon"
            name="person-circle-sharp"
          ></ion-icon>
          <p>Profile</p>
        </div>
      </div>
      <div className="profile">
        <img src="marcus.png" alt="your profile image" />
        <p>Marcus Aurelius</p>
      </div>
    </div>
  );
};
