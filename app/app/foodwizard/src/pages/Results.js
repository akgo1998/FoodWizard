import Axios from 'axios';
import { useLocation } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Results.css';
import './Page.css';
import Home from './Home.js';

const Results = () => {
    const location = useLocation();
    const [recipeInfo, setRecipeInfo] = useState({});
    const isMounted = useRef(false);

    let navigate = useNavigate(); 

    const onClickHandler = (event, recipeID) => {
      event.preventDefault();
      Axios.post('http://localhost:3005/api/getRecipeInformation', {
        recipeID: recipeID
      }).then((response) => {
        setRecipeInfo(response.data);
        if (response.data.length !== 0) {
            alert("Successful Find!");
        }
      }).catch((err) => {
        alert("This search for user has failed.");
      });
    }

    useEffect(() => {
      if (isMounted.current) {
          let path = `/recipeInfo`;
          navigate(path, {state : {recipeInfo: recipeInfo}});
      } else {
          isMounted.current = true;
      }
    }, [recipeInfo]);

    return (
      <>
        <Home />
        {location.state.recipeData.map(recipe => (
            <Row>
              <div class='btn background' onClick={(event) => onClickHandler(event, recipe.RecipeID)}>
                  <h3>{recipe.RecipeName}</h3>
                  <Col>
                    <h6>Rating: {recipe.Rating}</h6>
                  </Col>
                  <Col>
                    <h6>Serving Size: {recipe.ServingSize}</h6>
                  </Col>
                  <Col>
                    <h6>Cooking Time: {recipe.CookingTime}</h6>
                  </Col>
              </div>
            </Row>
          ))}
      </>
    );
  };
  
  export default Results;
