import { useContext, useState } from "react";
import { CreatePost } from "../../componentes/CreatePost/CreatePost";
import "./Home.css";
import "ionicons";
import { PostCard } from "../../componentes/PostCard/PostCard";
import { PostCardSkeleton } from "../../componentes/Skeletons/Skeletons";
import { usePost } from "../../hooks/usePost";
import { UserFollowingContext } from "../../context/UserFollowingContext";
import { useAuth } from "../../hooks/useAuth";

export const Home = () => {
  const { posts, isLoading } = usePost();
  const { followingList } = useContext(UserFollowingContext);
  const [isLoadingNewPost, setIsLoadingNewPost] = useState(false);
  const { user } = useAuth();

  const [feedType, setFeedType] = useState("For You");

  const followingIds = followingList.map((u) => Number(u.id_user_following));

  const filteredPosts =
    feedType === "Following"
      ? posts.filter((post) =>
          followingList.some(
            (user) =>
              followingIds.includes(Number(post.user_id)) ||
              Number(post.user_id) === user.id,
          ),
        )
      : posts;

  const mainClass = isLoadingNewPost && "is-loading";

  return (
    <main className={`main main--home ${mainClass}`}>
      <CreatePost setIsLoading={setIsLoadingNewPost} />
      {isLoadingNewPost && <span className="loader"></span>}
      <section className="posts-changer">
        <p
          className={feedType === "For You" ? "active" : ""}
          onClick={() => setFeedType("For You")}
        >
          For You
        </p>
        <span>/</span>
        <p
          className={feedType === "Following" ? "active" : ""}
          onClick={() => setFeedType("Following")}
        >
          Following
        </p>
      </section>
      <section className="posts-container">
        {!isLoading ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        )}
      </section>
    </main>
  );
};
