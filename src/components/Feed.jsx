import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import FindUser from "./FindUser";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import LikeImage from "./LikeImage";

function Feed() {
  const { user, token } = useContext(AuthContext);
  const [images, setImages] = useState([]);
  const userId = user._id;

  console.log(typeof userId);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/images/user/${userId}/friends-photos`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log("API Response:", res.data);
        const imagesArray = res.data.friendPhotos || [];
        setImages(imagesArray);
      });
  }, [userId, token]);

  return (
    <>
      {Array.isArray(images) ? (
        images
          .slice(0)
          .reverse()
          .map((photo) => (
            <div className="feedCard" key={photo._id}>
              <div className="feedContributors">
                <FindUser id={photo.user} />
                {photo.photographer || photo.model || photo.makeup_artist ? (
                  <div style={{ width: "fit-content", marginLeft: "10px" }}>
                    <span style={{ color: "gray" }}>In colaboration with:</span>{" "}
                    <Link to={`/user/${photo.photographer}`}>
                      {photo.photographer},
                    </Link>{" "}
                    <Link to={`/user/${photo.model}`}>{photo.model}</Link>{" "}
                    <Link to={`/user/${photo.makeup_artist}`}>
                      {photo.makeup_artist}
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <p style={{ width: "fit-content", marginLeft: "10px" }}>
                {photo.description}
              </p>
              <div className="feedImageContainer">
                <img src={photo.link} alt="" />
              </div>
              <div className="feedInteraction">
                <LikeImage photoId={photo._id} likes={photo.likes} />
                <CommentIcon style={{ color: "gray" }} />
              </div>
            </div>
          ))
      ) : (
        <p>No images to display</p>
      )}
    </>
  );
}

export default Feed;
