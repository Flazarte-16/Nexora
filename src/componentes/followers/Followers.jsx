import "./Followers.css";

export const Followers = () => {
  return (
    <div className="profiles-container">
      <h2>Profiles for you</h2>
      <div className="profiles">
        <img src="JhonDoe.png" alt="User img" />
        <p>Jhon Doe</p>
        <button className="Follow-button">Follow</button>
      </div>
      <div className="profiles">
        <img src="ElenaUx.png" alt="User img" />
        <p>Elena UX</p>
        <button className="Follow-button">Follow</button>
      </div>
    </div>
  );
};
