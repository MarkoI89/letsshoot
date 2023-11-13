import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router";

function FindUser({ id }) {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setUser(res.data);
      });
  }, [id, token]);

  return (
    <>
      {user && (
        <div style={{ display: "flex", padding: "10px 0px 10px 10px" }}>
          <img
            onClick={() => navigate(`/user/${user.username}`)}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            src={user.avatar}
            alt=""
          />
          <div>
            <h4 style={{ margin: "0px 0px 2px 10px", width: "fit-content" }}>
              {user.firstName} {user.lastName}
            </h4>
            <p
              style={{
                margin: "0px 0px 2px 10px",
                fontSize: "0.9em",
                color: "gray",
              }}
            >
              {user.role}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default FindUser;
