import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import ImageIcon from "@mui/icons-material/Image";
import { SvgIcon } from "@mui/material";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import DiamondIcon from "@mui/icons-material/Diamond";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

import TagColaborator from "./TagColaborator";

const API_URL = "http://localhost:8080";

const AddImage = ({ getLatestPictures }) => {
  const { token, user } = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [photographerInput, setPhotographerInput] = useState(false);
  const [modelInput, setModelInput] = useState(false);
  const [makeupInput, setMakeupInput] = useState(false);
  const [photographerColab, setPhotographerColab] = useState("");
  const [modelColab, setModelColab] = useState("");
  const [makeupColab, setMakeupColab] = useState("");

  const searchPhotographer = () => {
    if (!photographerInput) {
      setPhotographerInput(true);
      setModelInput(false);
      setMakeupInput(false);
    } else {
      setPhotographerInput(false);
    }
  };

  const searchModel = () => {
    if (!modelInput) {
      setModelInput(true);
      setPhotographerInput(false);
      setMakeupInput(false);
    } else {
      setModelInput(false);
    }
  };

  const searchMakeup = () => {
    if (!makeupInput) {
      setMakeupInput(true);
      setPhotographerInput(false);
      setModelInput(false);
    } else {
      setMakeupInput(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();
    fd.append("user", user._id);
    fd.append("image", image);
    fd.append("description", description);
    fd.append("photographer", photographerColab);
    fd.append("model", modelColab);
    fd.append("makeup_artist", makeupColab);
    const config = {
      baseURL: process.env.REACT_APP_API_URL,
      url: "/api/images",
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      data: fd,
    };
    axios(config)
      .then((res) => {
        console.log(res.data);
        getLatestPictures();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <form className="addImageCard" onSubmit={handleSubmit}>
      <div className="userAndInput">
        <img className="userPhoto" src={user.avatar} alt="" />
        <input
          className="imageDescriptionInput"
          type="text"
          placeholder="Add Image Description"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
      </div>
      <div>
        {photographerColab && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "250px",
            }}
          >
            <p
              style={{
                margin: "10px 0px 10px 20px",
                color: "gray",
                cursor: "pointer",
              }}
            >
              Photographer:{" "}
              <span style={{ color: "black" }}>{photographerColab}</span>
            </p>
            <p
              style={{ margin: "0px" }}
              onClick={() => setPhotographerColab(false)}
            >
              x
            </p>
          </div>
        )}
      </div>
      <div>
        {modelColab && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "250px",
            }}
          >
            <p
              style={{
                margin: "0px 0px 10px 20px",
                color: "gray",
                cursor: "pointer",
              }}
            >
              Model: <span style={{ color: "black" }}>{modelColab}</span>
            </p>
            <p style={{ margin: "0px" }} onClick={() => setModelColab(false)}>
              x
            </p>
          </div>
        )}
      </div>
      <div>
        {makeupColab && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "250px",
            }}
          >
            <p
              style={{
                margin: "0px 0px 10px 10px",
                color: "gray",
                cursor: "pointer",
              }}
            >
              Makeup Artist:{" "}
              <span style={{ color: "black" }}>{makeupColab}</span>
            </p>
            <p style={{ margin: "0px" }} onClick={() => setMakeupColab(false)}>
              x
            </p>
          </div>
        )}
      </div>
      <div className="addImageButtons">
        <input
          type="file"
          name="image"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label
          style={{ display: "flex", alignItems: "center" }}
          id="image-label"
          for="image"
        >
          <SvgIcon component={ImageIcon}></SvgIcon> <p>image</p>
        </label>
        <CameraEnhanceIcon
          style={{ color: "gray" }}
          onClick={searchPhotographer}
        />
        {photographerInput && (
          <TagColaborator
            setPhotographerColab={setPhotographerColab}
            setPhotographerInput={setPhotographerInput}
            placeHolderSearch={"Tag Photographer"}
          />
        )}
        <DiamondIcon style={{ color: "gray" }} onClick={searchModel} />
        {modelInput && (
          <TagColaborator
            setModelColab={setModelColab}
            setModelInput={setModelInput}
            placeHolderSearch={"Tag Model"}
          />
        )}
        <AutoFixHighIcon style={{ color: "gray" }} onClick={searchMakeup} />
        {makeupInput && (
          <TagColaborator
            setMakeupColab={setMakeupColab}
            setMakeupInput={setMakeupInput}
            placeHolderSearch={"Tag Makeup Artist"}
          />
        )}
        <button className="addImageSubmit">Add photo</button>
      </div>
    </form>
  );
};

export default AddImage;
