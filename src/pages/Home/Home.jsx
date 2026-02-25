import { CreatePost } from "../../componentes/CreatePost/CreatePost";
import { Followers } from "../../componentes/Followers/Followers";
import { List } from "../../componentes/List/List";
import "./Home.css";
import "ionicons";

export const Home = () => {
  return (
    <main className="main main--home">
      <CreatePost />
      <List />
    </main>
  );
};
