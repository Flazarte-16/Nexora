import { createContext, use, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const UserFollowingContext = createContext();

export const UserFollowingContextProvider = ({ children }) => {
  const [followingList, setFollowingList] = useState([]);
  const { user } = useAuth();

  const getUserFollowing = async () => {
    const response = await fetch(
      `http://localhost:3000/v1/users/follow/${user.id}`,
    );
    const data = await response.json();
    setFollowingList(data.usersFollowing);
  };

  useEffect(() => {
    getUserFollowing();
  }, []);

  return (
    <UserFollowingContext.Provider value={{ followingList }}>
      {children}
    </UserFollowingContext.Provider>
  );
};
