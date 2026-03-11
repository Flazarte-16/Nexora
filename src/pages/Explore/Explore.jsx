import { useEffect, useState } from "react";
import "./Explore.css";
import { Link } from "wouter";

export const Explore = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = (e) => setUsername(e.target.value);

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
      setUsers(data.user);
    }, 400);

    return () => clearTimeout(getData);
  }, [username]);

  return (
    <main className="main main--explore">
      <input
        type="text"
        placeholder="search..."
        name="username"
        onChange={handleSearch}
      />
      {username && (
        <section className="search-info">
          <h2 className="title l">
            Search results for <span>"{username}"</span>
          </h2>
          <p className="subtitle">Showing {users.length} results</p>
        </section>
      )}
      <section className="users-container">
        {users &&
          users.length > 0 &&
          users.map((user) => (
            <div className="profiles profiles--explore" key={user.id}>
              <img src={user.image_url} alt={`${user.username} image`} />
              <section className="profile-info">
                <Link
                  /*  onClick={handleRelocation} */
                  className="relocation-user"
                  to={`/${user.username}`}
                >
                  <h4>{user.full_name}</h4>
                </Link>
                <p className="profile-username">{user.username}</p>
                <p className="profile-description">{user.description}</p>
              </section>
              <button className="Follow-button">Follow</button>
            </div>
          ))}
      </section>
    </main>
  );
};
