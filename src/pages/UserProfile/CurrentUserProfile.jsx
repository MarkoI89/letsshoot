import React, { useContext, useEffect, useState } from "react";
import UserPictures from "../../components/UserPictures";
import { AuthContext } from "../../context/auth.context";
import "./UserProfile.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import GridOnIcon from "@mui/icons-material/GridOn";
import PortraitIcon from "@mui/icons-material/Portrait";
import TaggedImages from "../../components/TaggedImages";

const UserProfile = () => {
  const [userToDisplay, setUser] = useState(null);
  const [tagged, setTagged] = useState(false);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    setUser(user);
  }, [user]);

  const usersGallery = (e) => {
    e.preventDefault();
    setTagged(false);
  };

  const taggedGallery = (e) => {
    e.preventDefault();
    setTagged(true);
  };

  // users profile
  if (!userToDisplay) return <div>No profile</div>;
  return (
    <div className="userProfile">
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
        <div className="aboutMe">
          <h4>About me:</h4>
          <p className="aboutDescription">{userToDisplay.about}</p>
        </div>
      </section>
      <div className="albumSelectors">
        <div className={!tagged ? "albumSelectorActive" : "albumSelector"}>
          <GridOnIcon onClick={usersGallery} />
        </div>
        <div className={tagged ? "albumSelectorActive" : "albumSelector"}>
          <PortraitIcon onClick={taggedGallery} />
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
