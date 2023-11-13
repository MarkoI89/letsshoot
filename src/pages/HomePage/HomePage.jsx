import React, { useContext, useEffect, useState } from "react";
import "./homepage.css"
import { AuthContext } from "../../context/auth.context";
import AddImage from "../../components/AddImage";
import WorkIcon from "@mui/icons-material/Work";
import { SvgIcon } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from '@mui/icons-material/Email';
import FriendList from "../../components/FriendList";
import Feed from "../../components/Feed";

export default function FeedPage() {
  const { user } = useContext(AuthContext);
  const [userToDisplay, setUserToDisplay] = useState(null);

  useEffect(() => {
    setUserToDisplay(user);
  }, []);

  return (
    <>
      {userToDisplay && (
        <div className="feedPage">
          <div className="userDetailsCard">
            <div className="userDetails">
              <img
                className="userPhoto"
                src={user.avatar}
                alt={user.username}
              />
              <div className="userInfo">
                <h3 style={{ fontWeight: "bold", margin: "0" }}>
                  {user.firstName} {user.lastName}
                </h3>
                <p style={{ margin: "0", color: "gray" }}>{user.username}</p>
              </div>
            </div>
            <div
              className="centerElement"
              style={{
                borderBottom: "1px solid gray",
                width: "90%",
                margin: "10px 0px 10px 0px",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "flexStart",
                alignItems: "center",
                margin: "10px 0px 10px 0px"
              }}
            >
              <SvgIcon
                style={{ margin: "0px 10px 0px 10px", color: "gray" }}
                component={WorkIcon}
              ></SvgIcon>{" "}
              <p style={{ color: "gray", margin: "0px" }}>{user.role}</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flexStart",
                alignItems: "center",
                marginBottom: "10px"
              }}
            >
              <SvgIcon
                style={{ margin: "0px 10px 0px 10px", color: "gray" }}
                component={LocationOnIcon}
              ></SvgIcon>{" "}
              <p style={{ color: "gray", margin: "0px" }}>
                {user.location}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flexStart",
                alignItems: "center",
                
              }}
            >
              <SvgIcon
                style={{ margin: "0px 10px 0px 10px", color: "gray" }}
                component={EmailIcon}
              ></SvgIcon>{" "}
              <p style={{ color: "gray", margin: "0px" }}>
                {user.email}
              </p>
            </div>
          </div>
          <div className="feed">
            <div>
              <AddImage />
            </div>
            <div>
              <Feed />
            </div>
            <div></div>
          </div>
          <div className="friendList" >
             <FriendList />
          </div>
          <div className="recommendedUsers">
          </div>
        </div>
      )}
    </>
  );
}
