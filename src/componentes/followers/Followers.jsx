import "./Followers.css";

export const Followers = () => {
  return (
    <div className="profiles-container">
      <h2>Profiles for you</h2>
      <div className="profiles">
        <img src="JhonDoe.png" alt="User img" />
        <section className="profile-info">
          <h4>Jhon Doe</h4>
          <p>@jdoe</p>
        </section>
        <button className="Follow-button">Follow</button>
      </div>
      <div className="profiles">
        <img src="ElenaUx.png" alt="User img" />
        <section className="profile-info">
          <h4>Elena UX</h4>
          <p>@elenaux</p>
        </section>
        <button className="Follow-button">Follow</button>
      </div>
      <div className="profiles">
        <img src="ElenaUx.png" alt="User img" />
        <section className="profile-info">
          <h4>Constantino Pasquali</h4>
          <p>@cpasquali</p>
        </section>
        <button className="Follow-button">Follow</button>
      </div>
    </div>
  );
};
