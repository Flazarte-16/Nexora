import { useContext, useEffect, useState } from "react";
import "./Notifications.css";
import { Link } from "wouter";
import { useAuth } from "../../hooks/useAuth";
import { NotificationsContext } from "../../context/NotificationsContext";
import { sileo } from "sileo";

export const Notifications = () => {
  const context = useContext(NotificationsContext);
  const { notifications, setNotifications } = context;
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const getData = async () => {
      const response = await fetch(
        `http://localhost:3000/v1/users/${user.id}/notifications`,
        {
          method: "PUT",
        },
      );
      const data = await response.json();
      setNotifications(data.notifications);
    };
    getData();
  }, [user?.id]);

  const deleteNotification = async (notification_id) => {
    const response = await fetch(
      `http://localhost:3000/v1/users/${user.id}/notifications/${notification_id}`,
      {
        method: "DELETE",
      },
    );
    const data = await response.json();

    if (data.type !== "OK") return;

    sileo.success({
      title: data.message,
      duration: 1000,
      fill: "#000000",
    });

    setNotifications((prev) =>
      [...prev].filter((noti) => noti.id !== notification_id),
    );
  };

  return (
    <main className="main main--notifications">
      <section className="main--notifications-header">
        <h2 className="title l">Notifications</h2>
      </section>
      <section className="notifications-container">
        {notifications && notifications.length > 0 ? (
          notifications.map((noti) => (
            <article
              key={noti.id}
              className={`notification-card ${!noti.is_read && "viewed"}`}
            >
              <section className="notification-card-left">
                <img src={noti.actor.image_url} alt="follower image" />
                <h2 className="title m">
                  {noti.message.split(" ").map((word) => {
                    if (word === noti.actor.username) {
                      return (
                        <Link
                          key={word}
                          className="relocation-user mention"
                          to={`/${word.slice(0)}`}
                        >
                          {" " + word}
                        </Link>
                      );
                    } else {
                      return " " + word;
                    }
                  })}
                </h2>
              </section>
              <section className="notification-card-right">
                <button
                  className="noti-btn delete"
                  onClick={() => deleteNotification(noti.id)}
                >
                  <ion-icon name="close-outline"></ion-icon>
                </button>
              </section>
            </article>
          ))
        ) : (
          <p className="subtitle xl secondary">Nothing to see here… yet</p>
        )}
      </section>
    </main>
  );
};
