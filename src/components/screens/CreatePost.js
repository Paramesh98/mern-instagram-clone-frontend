import React, { useState } from "react";
import AxiosInstance from "../../helpers/axios";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
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
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
    const dataToSubmit = {
      title: title,
      body: body,
      photo: image,
    };
    AxiosInstance.post("/router/post/createpost", dataToSubmit, config)
      .then((res) => {
        history.push("/");

        if (res) {
          console.log(res);
          M.toast({
            html: "Post Upload Success",
            classes: "#43a047 green darken-1",
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        if (err) {
          M.toast({
            html: err.response.data.message,
            classes: "#c62828 red darken-3",
          });
        }
      });
  };
  return (
    <div
      className="card input-field"
      style={{
        margin: "30px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div className="file-field input-field">
        <div className="btn #64b5f6 blue lighten-2">
          <span>Upload Image</span>
          <input onChange={(e) => fileChnage(e.target.files[0])} type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="title"
      />
      <input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        type="text"
        placeholder="body"
      />

      <button
        onClick={handleSubmit}
        className="btn waves-effect waves-light #64b5f6 blue lighten-2"
      >
        Submit Post
      </button>
    </div>
  );
}

export default CreatePost;
