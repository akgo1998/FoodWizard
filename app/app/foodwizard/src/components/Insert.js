import Axios from 'axios';
import { useState } from "react";
import ReactDOM from "react-dom";
import './Form.css'

function InsertForm() {
  const [userID, setUserID] = useState({});
  const [password, setPassword] = useState({});
  const [name, setName] = useState({});
  const [favRecipeID, setFavRecipeID] = useState({});
  const [favCuisineID, setFavCuisineID] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3002/api/insert', {
      userID: userID,
      password: password,
      name: name,
      favRecipeID: favRecipeID,
      favCuisineID: favCuisineID
    }).then((reponse) => {
      alert("Successful insert!");
    }).catch((err) => {
      alert("There was an error while inserting.");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Insert User Data</h1>
      <label className='input'>User ID: 
      <input 
        type="text" 
        name="userID"  
        onChange={(e) => {
          setUserID(e.target.value)
        }}
      />
      </label>
      <label className='input'>Password: 
        <input 
          type="text" 
          name="password" 
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        </label>
        <label className='input'>Name:
        <input 
          type="text" 
          name="name" 
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        </label>
        <label className='input'>Favorite Recipe ID:
        <input 
          type="number" 
          name="favRecipeID" 
          onChange={(e) => {
            setFavRecipeID(e.target.value)
          }}
        />
        </label>
        <label className='input'>Favorite Cuisine:
        <input 
          type="text" 
          name="favCuisineID" 
          onChange={(e) => {
            setFavCuisineID(e.target.value)
          }}
        />
        </label>
        <input type="submit" />
    </form>
  )
}
export default InsertForm;