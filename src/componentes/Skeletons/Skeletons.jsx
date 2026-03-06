import "./Skeletons.css";

export const ProfileSkeleton = () => {
  return (
    <main className="main main--profile">
      <section className="user-info">
        <section className="banner skeleton"></section>
        <article className="user-details skeleton">
          <div className="user-img skeleton"></div>
          <div className="user-name skeleton"></div>
          <div className="user-username skeleton"></div>
          <div className="user-description skeleton"></div>
          <article className="profile-sections skeleton">
            <div className="user-data skeleton"></div>
            <div className="user-data skeleton"></div>
            <div className="user-data skeleton"></div>
          </article>
        </article>
      </section>
      <section className="posts-container--profile">
        <PostCardSkeleton />
      </section>
    </main>
  );
};

export const PostCardSkeleton = () => {
  return (
    <article className="post-card skeleton">
      <section className="card-header">
        <div className="post-image skeleton"></div>
        <section className="card-header-info skeleton">
          <div className="user-data skeleton"></div>
          <div className="user-data skeleton"></div>
        </section>
      </section>
      <div className="post-card-content skeleton"></div>
      <article className="post-card-actions skeleton">
        <div className="action-btn skeleton"></div>
        <div className="action-btn skeleton"></div>
      </article>
    </article>
  );
};
