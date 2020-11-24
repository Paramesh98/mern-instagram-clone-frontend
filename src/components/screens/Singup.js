import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AxiosInstance from "../../helpers/axios";
import M from "materialize-css";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(undefined);
  const history = useHistory();

  const fileChnage = (val) => {
    const image = new FormData();
    image.append("post", val);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    AxiosInstance.post("/upload", image, config)
      .then((res) => {
        setImage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const dataToSubmit = {
      name: name,
      email: email,
      password: password,
      pic: image,
    };
    AxiosInstance.post("/router/auth/signup", dataToSubmit, config)
      .then((res) => {
        if (res) {
          console.log(res);
          M.toast({
            html: "Signup Success",
            classes: "#43a047 green darken-1",
          });
          history.push("/signin");
        }
      })
      .catch((err) => {
        if (err) {
          M.toast({
            html: err.response.data.message,
            classes: "#c62828 red darken-3",
          });
        }
      });
  };
  return (
    <div className="myCard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue lighten-2">
            <span>Upload Pic</span>
            <input
              onChange={(e) => fileChnage(e.target.files[0])}
              type="file"
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
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
          Sginup
        </button>
        <h5>
          <Link to="/signin">Already have account?</Link>{" "}
        </h5>
      </div>
    </div>
  );
}

export default Signup;
