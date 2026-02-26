import "./PostCard.css";

export const PostCard = ({ post }) => {
  return (
    <article className="post-card">
      <section className="card-header">
        <img
          src={
            "https://instagram.fros2-2.fna.fbcdn.net/v/t51.2885-19/434441254_943357720844361_5748407661863850083_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.fros2-2.fna.fbcdn.net&_nc_cat=109&_nc_oc=Q6cZ2QEqA16ATMxipx1CoN2AYXG5ktb8BVx9DiQvPHqXFoO38MVM4XuHDVKs1UCk-ALQrGs&_nc_ohc=vgqdrKR4GG0Q7kNvwFFEmCB&_nc_gid=7jBwr0lRgqWGhe5g2dx0EA&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_Afvtm0sfTvnIRAi31pv9xgkXt2iV9lt91YnlFIFWrRwnjQ&oe=69A55269&_nc_sid=7d3ac5"
          }
          alt={`foto de ${post.username}`}
        />
        <section className="card-header-info">
          <h4>{post.user.full_name}</h4>
          <p>@{post.user.username}</p>
        </section>
      </section>
      <p className="post-card-content">{post.content}</p>
    </article>
  );
};
