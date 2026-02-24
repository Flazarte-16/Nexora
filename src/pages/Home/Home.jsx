import { CreatePost } from "../../componentes/createPost/CreatePost";
import { Followers } from "../../componentes/followers/Followers";
import { SideBar } from "../../componentes/sideBar/SideBar";
import "./Home.css";
import "ionicons";

export const Home = () => {
  return (
    <main className="main main--home">
      <CreatePost />
      <SideBar />
      <Followers />
    </main>
  );
};
