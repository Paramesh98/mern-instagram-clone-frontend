import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import AxiosInstance from "../../helpers/axios";
function Reset() {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const dataToSubmit = {
      email: email,
    };
    AxiosInstance.post("/router/auth/resetpassword", dataToSubmit, config)
      .then((res) => {
        if (res) {
          console.log(res);
          M.toast({
            html: "Check your mail",
            classes: "#43a047 green darken-1",
          });
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          M.toast({
            html: err?.response?.data?.error,
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

export default Reset;
