import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import PhotoModal from "./PhotoModal";

export default function TaggedImages({username}) {
  const { token } = useContext(AuthContext);

  const [images, setImages] = useState([]);
  const [photoModal, setPhotoModal] = useState(null);
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [photographer, setPhotographer] = useState("");
  const [model, setModel] = useState("");
  const [makeup, setMakeup] = useState("");
  const [likes, setLikes] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userName, setUserName] = useState("")


  const clickImage = (picture, index) => {
    setPhotoModal(true);
    setPhoto(picture.link);
    setDescription(picture.description);
    setPhotographer(picture.photographer);
    setModel(picture.model);
    setMakeup(picture.makeup_artist);
    setLikes(picture.likes);
    setFirstName(picture.user.firstName);
    setLastName(picture.user.lastName);
    setAvatar(picture.user.avatar);
    setUserName(picture.user.username)

  };

  console.log(userName)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/images/user/${username}/tags`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setImages(res.data);
      });
  }, [username, token]);

  return (
    <>
      <section className="usersPictures">
        { images.length === 0 ? 
        <div>
          <h4 style={{color: "gray", padding:"100px 0px 100px 0px"}} >No images</h4>
        </div> : images.map((picture, index) => (
          <div className="photoContainer" key={picture.link}>
            <img
              src={picture.link}
              alt={"users pic"}
              loading="lazy"
              on
              onClick={() => clickImage(picture, index)}
            />
          </div>
        ))}
        {photoModal && (
          <PhotoModal
            photo={photo}
            description={description}
            photographer={photographer}
            model={model}
            makeup={makeup}
            likes={likes}
            setPhotoModal={setPhotoModal}
            firstName={firstName}
            lastName={lastName}
            avatar={avatar}
            userName={userName}
          />
        )}
      </section>
    </>
  );
}
