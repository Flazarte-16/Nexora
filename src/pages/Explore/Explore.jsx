import { useEffect, useState } from "react";
import "./Explore.css";
import { UserCard } from "../../componentes/UserCard/UserCard";
import { UserCardSkeleton } from "../../componentes/Skeletons/Skeletons";

export const Explore = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => setUsername(e.target.value);

  useEffect(() => {
    if (!username) {
      setUsers([]);
      return;
    }

    const getData = setTimeout(async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:3000/v1/users?username=${username}`,
        );
        const data = await response.json();
        setUsers(data.user);
      } finally {
        setIsLoading(false);
      }
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
        {users && users.length > 0 && !isLoading ? (
          users.map((user) => (
            <UserCard u={user} key={user.id} variant="extend" />
          ))
        ) : isLoading && username ? (
          <>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </>
        ) : (
          ""
        )}
      </section>
    </main>
  );
};
