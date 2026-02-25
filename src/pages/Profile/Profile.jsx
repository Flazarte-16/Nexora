import "./Profile.css";

export const Profile = () => {
  return (
    <main className="main main--profile">
      <section className="user-info">
        <article className="profile-topbar">
          <ion-icon name="arrow-back-outline"></ion-icon>
          <article>
            <h2>Constantino Pasquali</h2>
            <h3>2 posts</h3>
          </article>
        </article>
        <img
          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZ3JhbWFjaW9ufGVufDB8fDB8fHww"
          alt="wall-photo"
          className="wall-photo"
        />
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQFVhpA9Yxu8Og/profile-displayphoto-shrink_100_100/B4DZUj6bGcGkAU-/0/1740064273451?e=1773273600&v=beta&t=5hyUnpPAaSTaZUbN3LiReXz8q5EIv7LfsixbxB-xE90"
          alt="Foto de perfil"
          className="user-img"
        />
        <article className="user-details">
          <h2>Constantino Pasquali</h2>
          <h3>@cpasquali</h3>
          <p>
            Programmer in training with a strong interest in web development and
            modern technologies. Focused on learning and continuously improving
            coding skills.
          </p>
          <span className="user-link">
            <ion-icon name="link-outline"></ion-icon>
            <a href="https://www.instagram.com/coni.pasquali/">Instagram</a>
            <span>joined: 24/2/2026</span>
          </span>
        </article>
      </section>
    </main>
  );
};
