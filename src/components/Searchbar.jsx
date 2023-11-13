import React, { useState, useEffect } from "react";
import "../App.js";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import DiamondIcon from "@mui/icons-material/Diamond";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkIcon from "@mui/icons-material/Work";

function Searchbar({ placeHolderSearch }) {
  const [filterData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const { isLoggedIn, token } = useContext(AuthContext);

  useEffect(() => {
    if (!wordEntered) return;
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user?username=${wordEntered}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFilteredData(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  }, [wordEntered, token]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
  };
  const clearInput = () => {
    setFilteredData([]);
  };
  return (
    <div className="search">
      {isLoggedIn && (
        <>
          <div className="searchInput">
            <input
              type="text"
              placeholder={placeHolderSearch}
              value={wordEntered}
              onChange={handleFilter}
            />
            <div className="searchIcon">
              {/* SearchIcon onClick function to define */}
              {filterData.length === 0 ? (
                <SearchIcon />
              ) : (
                <CloseIcon id="clearBtn" onClick={clearInput} />
              )}
            </div>
          </div>
          {filterData.length !== 0 && (
            <div className="dataResult">
              {filterData.slice(0, 4).map((userItem) => {
                return (
                  //                {/* value.title = the value parameter and the value wanted */}

                  <Link
                    key={userItem._id}
                    className="dataItem"
                    to={"/user/" + userItem.username.toLowerCase()}
                  >
                    <div className="searchData">
                      <div className="foundUser" >
                        <img
                          style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
                          src={userItem.avatar}
                          alt=""
                        />
                        <p style={{ color: "black" }}>{userItem.username}</p>{" "}
                      </div>
                      {userItem.role.includes("photographer") && (
                        <CameraEnhanceIcon style={{ color: "black" }} />
                      )}
                      {userItem.role.includes("model") && <DiamondIcon style={{ color: "black" }} />}
                      {userItem.role.includes("makeup artist") && (
                        <AutoFixHighIcon style={{ color: "black" }} />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      )}
      {!isLoggedIn && <></>}
    </div>
  );
}

export default Searchbar;
