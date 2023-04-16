import Axios from 'axios';
import { useState } from "react";
import ReactDOM from "react-dom";

function UpdateRecipeRating() {
  const [recipeID, setRecipeID] = useState({});
  const [rating, setRating] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3002/api/updateRating', {
      recipeID: recipeID,
      rating: rating
    }).then((response) => {
      alert("Update successful!");
   }).catch((err) => {
     alert("This update for user has failed.");
   })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Recipe Rating</h1>
      <label className='input'>Recipe ID:
      <input 
        type="number" 
        name="recipeID" 
        onChange={(e) => {
          setRecipeID(e.target.value)
        }}
      />
      </label>
      <label className='input'>Rating:
      <input 
        type="number" 
        name="rating" 
        onChange={(e) => {
          setRating(e.target.value)
        }}
      />
      </label>
        <input type="submit" />
    </form>
  )
}
export default UpdateRecipeRating;