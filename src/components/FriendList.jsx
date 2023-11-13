import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router";

function FriendList() {
  const { user, token } = useContext(AuthContext);
  const userId = user._id;
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${userId}/friends`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setFriends(res.data);
      });
  }, [userId, token]);

  return (
    <div className="friendsCard">
      <h4 style={{ margin: "10px 0px 10px 10px" }}>Friend list</h4>
      {friends.map((friend) => (
        <div
          onClick={() => navigate(`/user/${friend.username}`)}
          className="friendInfo"
        >
          <img
            style={{ width: "30px", borderRadius: "50%", marginRight: "10px" }}
            src={friend.avatar}
            alt={friend.username}
          />
          {friend.username}
        </div>
      ))}
    </div>
  );
}

export default FriendList;
