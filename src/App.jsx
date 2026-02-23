import "./App.css";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Route, Switch } from "wouter";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
      </Switch>
    </div>
  );
}
export default App;
