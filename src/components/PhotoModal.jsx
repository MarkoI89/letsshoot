import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import LikeImage from "./LikeImage";
import { AuthContext } from "../context/auth.context";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteImage from "./DeleteImage";

export default function PhotoModal({
  photo,
  photoId,
  description,
  photographer,
  model,
  makeup,
  likes,
  setPhotoModal,
  firstName,
  lastName,
  avatar,
  userId,
  userName,
  getLatestPictures,
}) {
  const { user } = useContext(AuthContext);
  const loggedUserId = user._id;
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  console.log(userId);

  const clickAvatar = () => {
    if (user._id !== userId) {
      navigate(`/user/${userName}`);
      setPhotoModal(false);
    } else {
      navigate(`/profile`);
      setPhotoModal(false);
    }
  };

  return (
    <div className="photoModalContainer">
      <div className="photoModal">
        <img src={photo} alt="" />
      </div>
      <div className="photoDetails">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              onClick={clickAvatar}
              className="userPhoto"
              src={avatar}
              alt=""
            />
            <h4 style={{ marginRight: "5px" }}>{firstName}</h4>
            <h4>{lastName}</h4>
            <p
              onClick={() => setPhotoModal(false)}
              className="removePhotoModal"
              style={{ color: "gray", cursor: "pointer" }}
            >
              X
            </p>
            {userId === loggedUserId ? (
              <DeleteIcon
                onClick={() => setDeleteModal(true)}
                className="deletePhoto"
              />
            ) : (
              <></>
            )}
            {deleteModal && (
            <div style={{width: "100%", height:"100%", backgroundColor: "rgb(0,0,0,0.5)"}} >
              <div className="deletePhotoModal">
                <h4>Are you sure you want to delete this photo?</h4>
                <div style={{display: "flex", justifyContent:"space-evenly"}} >
                  <DeleteImage
                    imageId={photoId}
                    getLatestPictures={getLatestPictures}
                    setDeleteModal={setDeleteModal}
                    setPhotoModal={setPhotoModal}
                  />
                  <button className="cancelDeletePhoto" onClick={() => setDeleteModal(false)}>Cancel</button>
                </div>
              </div>
              </div>
            )}
          </div>
          {photographer || model || makeup ? (
            <p>
              <span style={{ color: "gray" }}>Colaborated with:</span>{" "}
              <Link
                style={{ paddingRight: "5px" }}
                to={`/user/${photographer}`}
              >
                {photographer}
              </Link>
              <Link style={{ paddingRight: "5px" }} to={`/user/${model}`}>
                {model}
              </Link>
              <Link style={{ paddingRight: "5px" }} to={`/user/${makeup}`}>
                {makeup}
              </Link>
            </p>
          ) : (
            <></>
          )}
          <p>{description}</p>
        </div>
        <div className="photoModalUserInteraction">
          <LikeImage photoId={photoId} likes={likes} />
          <CommentIcon style={{ color: "gray" }} />
        </div>
      </div>
    </div>
  );
}
