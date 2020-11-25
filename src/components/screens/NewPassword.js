import React, { useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import M from "materialize-css";
import AxiosInstance from "../../helpers/axios";
import { UserContext } from "../../App";
function NewPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const { token } = useParams();
  //   console.log(token);
  const handleSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const dataToSubmit = {
      password: password,
      token,
    };
    AxiosInstance.post("/router/auth/newpassword", dataToSubmit, config)
      .then((res) => {
        if (res) {
          console.log(res);
          M.toast({
            html: "Password Update Success",
            classes: "#43a047 green darken-1",
          });
          history.push("/signin");
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter New Password"
        />
        <button
          onClick={handleSubmit}
          className="btn waves-effect waves-light #64b5f6 blue lighten-2"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default NewPassword;
