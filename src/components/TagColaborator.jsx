import React, { useState, useEffect } from "react";
import "../App.js";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context.jsx";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import DiamondIcon from "@mui/icons-material/Diamond";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

export default function TagColaborator({
  setPhotographerColab,
  setPhotographerInput,
  setModelColab,
  setModelInput,
  setMakeupColab,
  setMakeupInput,
  placeHolderSearch,
}) {
  const [filterData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const { isLoggedIn, token } = useContext(AuthContext);

  const handlePhotographer = (userItem) => {
    if (userItem.role.includes("photographer")) {
      setPhotographerColab(userItem.username);
      clearInput();
      setPhotographerInput(false);
    } else if (userItem.role.includes("model")) {
      setModelColab(userItem.username);
      clearInput();
      setModelInput(false);
    } else if (userItem.role.includes("makeup artist")) {
      setMakeupColab(userItem.username);
      clearInput();
      setMakeupInput(false);
    }
  };

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
              value={wordEntered}
              onChange={handleFilter}
              placeholder={placeHolderSearch}
            />
            <div className="searchIcon">
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
                  <div key={userItem._id} className="dataItem">
                    <p onClick={() => handlePhotographer(userItem)}>
                      {userItem.username}{" "}
                      {userItem.role.includes("photographer") && (
                        <CameraEnhanceIcon />
                      )}
                      {userItem.role.includes("model") && <DiamondIcon />}
                      {userItem.role.includes("makeup artist") && (
                        <AutoFixHighIcon />
                      )}
                    </p>
                  </div>
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
