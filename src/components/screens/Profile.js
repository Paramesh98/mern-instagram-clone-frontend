import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import AxiosInstance from "../../helpers/axios";
import UserPic from "../../assets/user.png";

function Profile() {
  const [pics, setPics] = useState([]);
  const [image, setImage] = useState("");
  const { state, dispatch } = useContext(UserContext);

  const getPosts = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
    AxiosInstance.get("/router/post/mypost", config)
      .then((res) => setPics(res.data.post))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPosts();
  }, []);

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
        handleSubmit(res.data);
        setImage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (imageVal) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
    const dataToSubmit = {
      pic: imageVal,
    };
    AxiosInstance.put("/user/updatepic", dataToSubmit, config)
      .then((res) => {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...state, pic: imageVal })
        );
        dispatch({ type: "UPDATE_PIC", payload: imageVal });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {state ? (
        <div style={{ maxWidth: "800px", margin: "0px auto" }}>
          <div style={{ margin: "18px 0px", borderBottom: "1px solid gray" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>
                <img
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "80px",
                  }}
                  src={state?.pic || UserPic}
                  alt="user-profile"
                />
              </div>

              <div>
                <h4>{state?.name}</h4>
                <h5>{state?.email}</h5>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "108%",
                  }}
                >
                  <h6>{pics.length} posts</h6>
                  <h6>{state?.followers?.length} followers</h6>
                  <h6>{state?.following?.length} following</h6>
                </div>
              </div>
            </div>
            <div className="file-field input-field">
              <div className="btn #64b5f6 blue lighten-2">
                <span>Update Profile</span>
                <input
                  onChange={(e) => fileChnage(e.target.files[0])}
                  type="file"
                />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
          </div>
          <div className="gallery">
            {pics &&
              pics.map((item) => (
                <img
                  style={{ marginBottom: "20px" }}
                  className="item"
                  src={item.photo}
                  alt={item.title}
                />
              ))}
          </div>
        </div>
      ) : (
        <h2>Loading.....</h2>
      )}
    </>
  );
}

export default Profile;
