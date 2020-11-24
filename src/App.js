import React, { createContext, useReducer, useEffect, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Singup from "./components/screens/Singup";
import Profile from "./components/screens/Profile";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";
import { initialState, UserReducer } from "./reducer/UserReducer";
import FollwoPost from "./components/screens/FollowUserPost";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/signin");
    }
  }, []);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signin" exact component={Signin} />
      <Route path="/signup" exact component={Singup} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/create" exact component={CreatePost} />
      <Route path="/profile/:userId" exact component={UserProfile} />
      <Route path="/followingpost" exact component={FollwoPost} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
