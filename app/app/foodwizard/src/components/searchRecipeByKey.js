import Axios from 'axios';
import { useState } from "react";
import ReactDOM from "react-dom";

function SearchRecipeByKey() {
  const [keyword, setKeyword] = useState({});

  const[recipeInfo, setRecipeInfo] = useState([]);
  // const recipe_data = Object.values(recipeInfo);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    Axios.post('http://localhost:3002/api/searchRecipeByKey', {
      keyword: keyword
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
      <h1>Search Recipe by Keyword</h1>
      <label className='input'>Recipe Keyword:
      <input 
        type="text" 
        name="keyword" 
        onChange={(e) => {
          setKeyword(e.target.value)
        }}
      />
      </label>
        <input type="submit" />
      <br></br>
      {recipeInfo.map(recipe => (
        <p>Recipe Name: {recipe.RecipeName} | Cooking Time: {recipe.CookingTime} | Rating: {recipe.Rating} | Servings: {recipe.ServingSize}</p>
      ))}
      <br></br>
    </form>
  )
}
export default SearchRecipeByKey;