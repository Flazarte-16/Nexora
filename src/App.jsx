import "./App.css";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Route, Switch, useLocation } from "wouter";
import { Home } from "./pages/Home/Home";
import { RightSidebar, SideBar } from "./componentes/SideBar/SideBar";
import { NotificationContextProvider } from "./context/NotificationsContext";
import { Profile } from "./pages/Profile/Profile";
import { Explore } from "./pages/Explore/Explore";
import { AuthContextProvider } from "./context/AuthContext";
import { PostContextProvider } from "./context/PostContext";
import { UserFollowingContextProvider } from "./context/UserFollowingContext";
import { Toaster } from "sileo";
import { Notifications } from "./pages/Notifications/Notifications";

function App() {
  const [location] = useLocation();

  return (
    <div className="app">
      <Toaster position="top-center" />
      <AuthContextProvider>
        <NotificationContextProvider>
          <UserFollowingContextProvider>
            <PostContextProvider>
              <Switch>
                <Route path="/" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/home" component={Home} />
                <Route path="/explore" component={Explore} />
                <Route path="notifications" component={Notifications} />
                <Route path="/:username" component={Profile} />
              </Switch>
              {location !== "/" && location !== "/register" && <SideBar />}
              {location !== "/" &&
                location !== "/register" &&
                location !== "/explore" && <RightSidebar />}
            </PostContextProvider>
          </UserFollowingContextProvider>
        </NotificationContextProvider>
      </AuthContextProvider>
    </div>
  );
}
export default App;
