import React, {useState, useEffect} from "react";
import '../App.css'
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
// import BookData from '../Data.json'

function Searchbar ({placeHolderSearch}) {
    const [filterData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

useEffect(() => {

  axios.get('https://lets-shoot.herokuapp.com/api/user?username=' + wordEntered)
    .then(res => {
      console.log(res.data)
    })
    .catch(e => console.log(e))

},[wordEntered])
    const handleFilter = (event) =>{
      const searchWord =  event.target.value
      setWordEntered(searchWord)
    //   filtering logic of the searchbar
    
      // const newFilter = data.filter((value) =>{
      //   return value.title.toLowerCase.includes(searchWord.toLowerCase);
      // });
    //   if (searchWord === ""){
    //     setFilteredData([])
    //   }else {
    //     setFilteredData(newFilter);
  
    // }
    }
    const clearInput = ()=>{
        setFilteredData([]);
    }
return (
    <div className="search">
    <div className="searchInput">
        <input type="text" placeholder={placeHolderSearch} value={wordEntered} onChange={handleFilter}/>
        <div className="searchIcon">
        {/* SearchIcon onClick function to define */}
        {filterData.length === 0 ? (<SearchIcon/>) : (<CloseIcon id="clearBtn" onClick={clearInput}/>)}
           
        </div>
    </div>
    {filterData.length !== 0}
    <div className="dataResult">
      {filterData.slice(0, 4).map((value, key) => {
            return (
                //                {/* value.title = the value parameter and the value wanted */}

                <Link className="dataItem" to={value.link}>
            <p>{value.title}</p>
            </Link>
        )})}
    </div>
    </div>
)
}

export default Searchbar;