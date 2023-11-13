import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function LikeImage({ photoId, likes }) {
  const { user, token } = useContext(AuthContext);
  const userId = user._id;
  const [likeCount, setLikeCount] = useState(Object.keys(likes).length);
  const [isLiked, setIsLiked] = useState(Boolean(likes[userId]));

  const patchLike = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/images/like/${photoId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        }
      );
      const updatedData = await response.json();
      setLikeCount(Object.keys(updatedData.likes).length);
      setIsLiked(Boolean(updatedData.likes[userId]));
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <div>
      {isLiked ? (
        <FavoriteIcon style={{ color: "red" }} onClick={patchLike} />
      ) : (
        <FavoriteBorderIcon style={{ color: "gray" }} onClick={patchLike} />
      )}
      <p className="likeCount">{likeCount}</p>
    </div>
  );
}

export default LikeImage;
