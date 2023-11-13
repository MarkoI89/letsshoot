
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserPictures from "./../components/UserPictures";
import "./UserProfile/UserProfile.css";
import { AuthContext } from "../context/auth.context";
import AddRemoveFriend from "../components/AddRemoveFriend";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import GridOnIcon from "@mui/icons-material/GridOn";
import PortraitIcon from "@mui/icons-material/Portrait";
import TaggedImages from "../components/TaggedImages";

const UserProfile = () => {
  const { user, token } = useContext(AuthContext);

  const { username } = useParams();
  const [userToDisplay, setUserToDisplay] = useState(null);
  const [tagged, setTagged] = useState(false);

  useEffect(() => {
    if (username) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/user?username=${username}`, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          const selectedUser = res.data[0];
          setUserToDisplay(selectedUser);
          console.log(user.friends);
        });
    }
  }, [username, token]);

  const isFriend = () =>
    userToDisplay.friends.find((friend) => friend._id === user.id);

  // users profile
  if (!userToDisplay) return <div>No profile</div>;
  return (
    <div>
      <section className="user">
        <div className="coverPhoto">
          <img src={userToDisplay.cover} alt="" />
        </div>
        <div className="profileDetails">
          {userToDisplay.avatar && (
            <div className="avatarFrame">
              <img
                className="avatar"
                src={userToDisplay.avatar}
                alt={`profile ${userToDisplay.username}`}
              />
            </div>
          )}
          <div className="userInfos">
            <div className="username">
              {userToDisplay.firstName} {userToDisplay.lastName}{" "}
              <span
                style={{
                  color: "gray",
                  fontWeight: "lighter",
                  marginLeft: "20px",
                }}
              >
                {userToDisplay.username}
              </span>
              <AddRemoveFriend userToDisplay={userToDisplay} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "gray",
                marginBottom: "30px",
              }}
            >
              {userToDisplay.role}
            </div>
            <div
              style={{ display: "flex", alignItems: "center", color: "gray" }}
            >
              <div
                style={{
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LocationOnIcon />
                {userToDisplay.location}
              </div>
              <div
                style={{
                  marginRight: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <EmailIcon />
                {userToDisplay.email}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="albumSelectors">
        <div className={!tagged ? "albumSelectorActive" : "albumSelector"}>
          <GridOnIcon onClick={() => setTagged(false)} />
        </div>
        <div className={tagged ? "albumSelectorActive" : "albumSelector"}>
          <PortraitIcon onClick={() => setTagged(true)} />
        </div>
      </div>
      {tagged ? (
        <TaggedImages username={userToDisplay.username} />
      ) : (
        <UserPictures id={userToDisplay._id} />
      )}
    </div>
  );
};

export default UserProfile;
