import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import AxiosInstance from "../../helpers/axios";
import UserPic from "../../assets/user.png";

function UserProfile() {
  const [pics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(null);

  const { userId } = useParams();
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userId) : true
  );
  const getPosts = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
    AxiosInstance.get(`/user/${userId}`, config)
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPosts();
  }, []);

  const followUser = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
    AxiosInstance.put("/user/follow", { followId: userId }, config)
      .then((res) => {
        dispatch({
          type: "UPDATE",
          payload: {
            following: res.data.following,
            followers: res.data.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(res.data));
        setUserProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, res.data._id],
            },
          };
        });
        setShowFollow(false);
      })
      .catch((err) => console.log(err));
  };

  const unfollowUser = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    };
    AxiosInstance.put("/user/unfollow", { unfollowId: userId }, config)
      .then((res) => {
        dispatch({
          type: "UPDATE",
          payload: {
            following: res.data.following,
            followers: res.data.followers,
          },
        });
        localStorage.setItem("user", JSON.stringify(res.data));

        setUserProfile((prevState) => {
          const newItem = prevState.user.followers.filter(
            (item) => item != res.data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newItem,
            },
          };
        });
        setShowFollow(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {userProfile ? (
        <div style={{ maxWidth: "800px", margin: "0px auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px",
              borderBottom: "1px solid gray",
            }}
          >
            <div>
              <img
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src={userProfile?.user?.pic || UserPic}
              />
            </div>
            <div>
              <h4>{userProfile?.user?.name}</h4>
              <h5>{userProfile?.user?.email}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{userProfile?.post?.length} posts</h6>
                <h6>{userProfile?.user.followers?.length || 0} followers</h6>
                <h6>{userProfile?.user.following?.length || 0} following</h6>
              </div>
              {showFollow ? (
                <button
                  style={{ margin: "10px" }}
                  onClick={followUser}
                  className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                >
                  Follow
                </button>
              ) : (
                <button
                  style={{ margin: "10px" }}
                  onClick={unfollowUser}
                  className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                >
                  Unfollow
                </button>
              )}
            </div>
          </div>
          <div className="gallery">
            {userProfile &&
              userProfile.post.map((item) => (
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
        <h2>Loading...</h2>
      )}
    </>
  );
}

export default UserProfile;
