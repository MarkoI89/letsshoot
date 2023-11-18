import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const EditProfile = () => {
  const { authenticateUser, token, user } = useContext(AuthContext);

  const [image, setImage] = useState(user.avatar);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [location, setLocation] = useState(user.location);
  const [coverPhoto, setCoverPhoto] = useState(user.cover);
  const [about, setAbout] = useState(user.about)

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append("avatar", image);
    fd.append("firstName", firstName);
    fd.append("lastName", lastName);
    fd.append("username", username);
    fd.append("location", location);
    fd.append("cover", coverPhoto);
    fd.append("about", about)
    const config = {
      baseURL: process.env.REACT_APP_API_URL,
      url: "/api/user",
      method: "PATCH",
      headers: { Authorization: "Bearer " + token },
      data: fd,
    };
    axios(config)
      .then((res) => {
        console.log(res.data);
        authenticateUser();
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <form onSubmit={handleSubmit} className="editProfilePage">
      <div className="editCoverPhoto">
        <div className="cover-photo-container">
          <input
            type="file"
            name="cover"
            id="cover"
            style={{ display: "none" }} // Hide the default input
            onChange={(e) => setCoverPhoto(e.target.files[0])}
          />
          <label htmlFor="cover" className="cover-label">
            <span className="hover-text">Click to choose photo</span>
            <img src={user.cover} alt={user.username} />
          </label>
        </div>
      </div>
      <div style={{ marginBottom: "30px" }}>
        <div className="cover-photo-container">
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
          <label htmlFor="avatar" className="cover-label">
            <span className="hover-text-avatar">Click to choose photo</span>
            <img className="editAvatar" src={user.avatar} alt={user.username} />
          </label>
      </div>
      <div className="editProfileForm">
        <div className="editProfileInputs">
          <div className="firstAndLastName">
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="First Name"
              value={firstName}
            />
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Last name"
              value={lastName}
            />
          </div>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            value={username}
          />
          <input
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Location"
            value={location}
          />
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            type="text"
            placeholder="About me"
            value={about}
            rows={10}
          />
        </div>
        <button onClick={handleSubmit} className="editProfileSubmit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
