import React from "react";
import axios from "axios";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";

const CurrentUserPicture = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/images?shot_by=${user.username}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return <div>Hey</div>;
};

export default CurrentUserPicture;
