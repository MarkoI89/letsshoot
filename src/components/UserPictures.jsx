import { useState, useEffect, useCallback} from "react";
import axiosInstance from "../utils/axiosInstance";
import PhotoModal from "./PhotoModal";

const UserPictures = ({ id }) => {

  const [pictures, setPictures] = useState([]);
  const [photoModal, setPhotoModal] = useState(null);
  const [photoId, setPhotoId] = useState("");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [photographer, setPhotographer] = useState("");
  const [model, setModel] = useState("");
  const [makeup, setMakeup] = useState("");
  const [likes, setLikes] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState("")

  const clickImage = (picture, index) => {
    setPhotoModal(true);
    setPhoto(picture.link);
    setPhotoId(picture._id);
    setDescription(picture.description);
    setPhotographer(picture.photographer);
    setModel(picture.model);
    setMakeup(picture.makeup_artist);
    setLikes(picture.likes);
    setFirstName(picture.user.firstName);
    setLastName(picture.user.lastName);
    setAvatar(picture.user.avatar);
    setUserId(picture.user._id)
    setUserName(picture.user.username)
  };

  const getLatestPictures = useCallback(() => {
    axiosInstance
      .get(`${process.env.REACT_APP_API_URL}/api/images/user/${id}`)
      .then((response) => {
        setPictures(response.data);
      })
      .catch((error) => {
        console.log("No images found");
      });
  }, [id]);

  useEffect(getLatestPictures, [getLatestPictures]);

  console.log(pictures);

  return (
    <>
      <section className="usersPictures">
        { pictures.length === 0 ? 
        <div>
          <h4 style={{color: "gray", padding:"100px 0px 100px 0px"}} >No images</h4>
        </div> : pictures.map((picture, index) => (
          <div className="photoContainer" key={picture.link}>
            <img
              src={picture.link}
              alt={"users pic"}
              loading="lazy"
              onClick={() => clickImage(picture, index)}
            />
          </div>
        ))}
        {photoModal && (
          <PhotoModal
            photo={photo}
            photoId={photoId}
            description={description}
            photographer={photographer}
            model={model}
            makeup={makeup}
            likes={likes}
            setPhotoModal={setPhotoModal}
            firstName={firstName}
            lastName={lastName}
            avatar={avatar}
            userId={userId}
            userName={userName}
            getLatestPictures={getLatestPictures}
          />
        )}
      </section>
    </>
  );
};

export default UserPictures;
