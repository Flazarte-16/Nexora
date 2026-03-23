import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const NotificationsContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const getData = async () => {
      const response = await fetch(
        `http://localhost:3000/v1/users/${user.id}/notifications`,
      );
      const data = await response.json();
      setNotifications(data.notifications);
    };
    getData();
  }, [user?.id]);

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  );
};
