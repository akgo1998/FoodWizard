import Axios from 'axios';
import { useState } from "react";
import ReactDOM from "react-dom";

function SearchRecipe() {
  const [recipeID, setRecipeID] = useState({});

  const[recipeInfo, setRecipeInfo] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault(); 
    Axios.post('http://localhost:3002/api/searchRecipe', {
      recipeID: recipeID
      }).then((response) => {
        setRecipeInfo(response.data);
        if (response.data.length !== 0) { //figure out why userInfo is changed into a different type when acquired from a hook
          alert("Successful Find!");
        }
      }).catch((err) => {
        alert("This request has failed.");
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Search Recipe</h1>
      <label className='input'>Recipe ID:
      <input 
        type="number" 
        name="recipeID" 
        onChange={(e) => {
          setRecipeID(e.target.value)
        }}
      />
      </label>
        <input type="submit" />
      <br></br>
      <h3>{JSON.stringify(recipeInfo,null,2)}</h3>
    </form>
  )
}
export default SearchRecipe;