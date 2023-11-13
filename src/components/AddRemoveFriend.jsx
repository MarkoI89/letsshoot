import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { SvgIcon } from "@mui/material";

function AddRemoveFriend({ userToDisplay }) {
  const { user, token } = useContext(AuthContext);
  const userToDisplayId = userToDisplay._id;
  const [friends, setFriends] = useState(user.friends);
  const userId = user._id;

  const isFriend = () =>
    friends.find((userFriendsId) => userFriendsId === userToDisplay._id);

  useEffect(() => {}, []);

  const patchFriend = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/${userId}/${userToDisplayId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setFriends(data);
  };

  return (
    <div onClick={patchFriend} className="addRemoveFriendsIcon">
      {isFriend() ? (
        <SvgIcon style={{ color: "#00d4ff" }} component={PersonRemoveIcon} />
      ) : (
        <SvgIcon style={{ color: "#00d4ff" }} component={PersonAddIcon} />
      )}
    </div>
  );
}

export default AddRemoveFriend;
