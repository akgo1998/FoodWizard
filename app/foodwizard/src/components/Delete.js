import Axios from 'axios';
import { useState } from "react";
import ReactDOM from "react-dom";

function DeleteUser() {
  const [userID, setUserID] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3002/api/delete', {
      userID: userID,
    }).then((response) => {
      alert("Delete successful.");
    }).catch((err) => {
      alert("Delete has failed.");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Delete User</h1>
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
    </form>
  )
}
export default DeleteUser;