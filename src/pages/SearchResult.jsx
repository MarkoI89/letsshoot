import Searchbar from "../components/Searchbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function SearchResults() {
  const [imagesList, setImagesList] = useState([]);

  const getAllImages = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/images`)
      .then((response) => setImagesList(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {imagesList.map((item) => (
        <ImageListItem key={item._id}>
          <img
            src={`${item.link}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.link}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={""}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default SearchResults;
