import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import AxiosInstance from "../../helpers/axios";
import { UserContext } from "../../App";
function Signin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  const handleSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const dataToSubmit = {
      email: email,
      password: password,
    };
    AxiosInstance.post("/router/auth/signin", dataToSubmit, config)
      .then((res) => {
        if (res) {
          // console.log(res);
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          dispatch({ type: "USER", payload: res.data.user });
          M.toast({
            html: "Signin Success",
            classes: "#43a047 green darken-1",
          });
          history.push("/");
        }
      })
      .catch((err) => {
        if (err) {
          // console.log(err);
          M.toast({
            html: err?.response?.data?.message,
            classes: "#c62828 red darken-3",
          });
        }
      });
  };
  return (
    <div className="myCard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button
          onClick={handleSubmit}
          className="btn waves-effect waves-light #64b5f6 blue lighten-2"
        >
          Signin
        </button>
        <h5>
          <Link to="/signup">Don't have account ?</Link>{" "}
        </h5>
      </div>
    </div>
  );
}

export default Signin;
