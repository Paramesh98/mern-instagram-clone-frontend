import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import AxiosInstance from "../../helpers/axios";
import UserPic from "../../assets/user.png";
function FollwoPost() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const getPosts = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
    AxiosInstance.get("/router/post/followpost", config)
      .then((res) => setData(res.data.post))
      .catch((err) => console.log(err));
  };

  const likePost = (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };

    AxiosInstance.put("/router/post/like", { postId: id }, config)
      .then((res) => {
        const result = res.data;
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };
  const unlikePost = (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
    AxiosInstance.put("/router/post/unlike", { postId: id }, config)
      .then((res) => {
        const result = res.data;
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const commentPost = (text, postId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };

    AxiosInstance.put("/router/post/comment", { text, postId }, config)
      .then((res) => {
        const result = res.data;
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });

        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };

    AxiosInstance.delete(`/router/post/deletepost/${id}`, config)
      .then((res) => {
        const newData = data.filter((item) => {
          return item._id !== res.data._id;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="home">
      {data &&
        data.map((item) => (
          <div key={item._id} className="card home-card">
            <h5 style={{ padding: "5px" }}>
              <Link
                to={
                  item.postedBy._id === state._id
                    ? `/profile`
                    : `/profile/${item.postedBy._id}`
                }
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={item?.postedBy?.pic || UserPic}
                  alt="profile"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "10px",
                    borderRadius: "50%",
                  }}
                />
                {item?.postedBy?.name}
              </Link>
              {item.postedBy._id === state._id && (
                <i
                  onClick={() => deletePost(item._id)}
                  style={{ float: "right", cursor: "pointer" }}
                  className="material-icons"
                >
                  delete
                </i>
              )}
            </h5>
            <div className="card-image">
              <img src={item.photo} alt="post" />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(state._id) ? (
                <i
                  onClick={() => unlikePost(item._id)}
                  style={{ cursor: "pointer" }}
                  className="material-icons"
                >
                  thumb_down
                </i>
              ) : (
                <i
                  onClick={() => likePost(item._id)}
                  style={{ cursor: "pointer" }}
                  className="material-icons"
                >
                  thumb_up
                </i>
              )}

              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((item) => {
                return (
                  <h6 key={item._id}>
                    <span style={{ fontWeight: "600" }}>
                      {item.postedBy.name}
                    </span>{" "}
                    <span>{item.text}</span>
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  commentPost(e.target[0].value, item._id);
                }}
              >
                <input name="text" type="text" placeholder="add a comment" />
              </form>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FollwoPost;
