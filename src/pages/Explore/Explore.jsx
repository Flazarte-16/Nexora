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
              </section>
              <button className="Follow-button">Follow</button>
            </div>
          ))}
      </section>
    </main>
  );
};
