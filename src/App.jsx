import "./App.css";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Route, Switch } from "wouter";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}
export default App;
