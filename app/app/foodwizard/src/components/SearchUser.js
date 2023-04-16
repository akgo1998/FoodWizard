import Axios from 'axios';
import { useState } from "react";
import ReactDOM from "react-dom";

function SearchUser() {
  const [userID, setUserID] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault(); 
    Axios.post('http://localhost:3002/api/searchUser', {
      userID: userID
      }).then((response) => {
        setUserInfo(response.data);
        if (response.data.length !== 0) { //figure out why userInfo is changed into a different type when acquired from a hook
          alert("Successful Find!");
        }
      }).catch((err) => {
        alert("This search for user has failed.");
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Search User</h1>
      <label className='input'>User ID:
      <input 
        type="text" 
        name="userID" 
        onChange={(e) => {
          setUserID(e.target.value)
        }}
      />
      </label>
        <input type="submit" />
      <br></br>
      <h3>{JSON.stringify(userInfo,null,2)}</h3>
    </form>
  )
}
export default SearchUser;