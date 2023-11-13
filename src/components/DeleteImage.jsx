import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const DeleteImage = ({ imageId, getLatestPictures, setDeleteModal, setPhotoModal }) => {
  const { token } = useContext(AuthContext);

  const handleClick = (event) => {
    event.preventDefault();
    const config = {
      baseURL: process.env.REACT_APP_API_URL,
      url: `/api/images/${imageId}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    };
    axios(config)
      .then((res) => {
        console.log(res.data);
        setDeleteModal(false)
        setPhotoModal(false)
        getLatestPictures();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return <button className="deleteImageButton" onClick={handleClick}>Yes</button>;
};

export default DeleteImage;
