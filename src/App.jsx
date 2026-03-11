import "./App.css";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Route, Switch, useLocation } from "wouter";
import { Home } from "./pages/Home/Home";
import { RightSidebar, SideBar } from "./componentes/SideBar/SideBar";
import { Profile } from "./pages/Profile/Profile";
import { Explore } from "./pages/Explore/Explore";
import { AuthContextProvider } from "./context/AuthContext";
import { PostContextProvider } from "./context/PostContext";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <PostContextProvider>
        <AuthContextProvider>
          <Switch>
            <Route path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="/explore" component={Explore} />
            <Route path="/:username" component={Profile} />
          </Switch>
          {location[0] !== "/" && location[0] !== "/register" && <SideBar />}
          {location[0] !== "/" && location[0] !== "/register" && (
            <RightSidebar />
          )}
        </AuthContextProvider>
      </PostContextProvider>
    </div>
  );
}
export default App;
