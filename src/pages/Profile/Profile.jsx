import "./Profile.css";
import { useEffect, useState } from "react";
import { PostCard } from "../../componentes/PostCard/PostCard";

export const Profile = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/v1/posts");
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, []);
  return (
    <main className="main main--profile">
      <section className="user-info">
        <section
          className="banner"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1542831371-29b0f74f9713?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZ3JhbWFjaW9ufGVufDB8fDB8fHww)",
          }}
        ></section>

        <article className="user-details">
          <img
            src="https://media.licdn.com/dms/image/v2/D4D03AQFVhpA9Yxu8Og/profile-displayphoto-shrink_100_100/B4DZUj6bGcGkAU-/0/1740064273451?e=1773273600&v=beta&t=5hyUnpPAaSTaZUbN3LiReXz8q5EIv7LfsixbxB-xE90"
            alt="Foto de perfil"
            className="user-img"
          />
          <h2 className="user-name">Constantino Pasquali</h2>
          <h3 className="user-username">@cpasquali</h3>
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
          <article className="profile-sections">
            <span>Posts</span>
            <span>Media</span>
            <span>Likes</span>
          </article>
        </article>
        <article>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </article>
      </section>
    </main>
  );
};
