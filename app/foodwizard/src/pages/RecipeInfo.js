import Axios from 'axios';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Col, Row, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Form.css'
import './Page.css';
import Home from './Home.js';


  const RecipeInfo = () => {
    const [userID, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userRating, setUserRating] = useState('');
    const location = useLocation();

    const handleFavorite = (event, recipeID) => {
      event.preventDefault();
      Axios.post('http://localhost:3005/api/updateFavoriteRecipe', {
        recipeID: recipeID,
        userID: userID,
        userPassword: userPassword
      }).then((response) => {
        if (response.data.length !== 0) {
            alert("Successful Updated Your Favorite Recipe! Bon Appetit!");
        }
      }).catch((err) => {
        alert("We were unable to successfully update your recipe.");
      });
    }

    const handleRating = (event, recipeID) => {
      event.preventDefault();
      Axios.post('http://localhost:3005/api/updateRating', {
        recipeID: recipeID,
        rating: userRating,
      }).then((response) => {
        if (response.data.length !== 0) {
            alert("Rating has been successfully submitted!");
        }
      }).catch((err) => {
        alert("We were unable to submit your rating");
      });
    }
    
    return (
      <><Home /><div class='background center'>
        <h1>{location.state.recipeInfo[0].RecipeName}</h1>
        <hr style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
        <h5>Directions:</h5>
        <p>{location.state.recipeInfo[0].Instructions}</p>
        <Row>
          <Col>
            <h5>Cooking Time: {location.state.recipeInfo[0].CookingTime}</h5>
          </Col>
          <Col>
            <h5>Serving Size: {location.state.recipeInfo[0].ServingSize}</h5>
          </Col>
          <Col>
            <h5>Rating: {location.state.recipeInfo[0].Rating}</h5>
          </Col>
          <Col>
            <h5>Cuisine: {location.state.recipeInfo[0].Cuisine}</h5>
          </Col>
          <Col>
            <h5>Number of Ratings: {location.state.recipeInfo[0].RatingsCount}</h5>
          </Col>
        </Row>
        <hr style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="cuisine">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={null} onChange={(e) => setUserId(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="cuisine">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" value={null} onChange={(e) => setUserPassword(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="secondary" type="submit" onClick={(e) => handleFavorite(e, location.state.recipeInfo[0].RecipeID)}>
                  Favorite This Recipe!
              </Button>
            </Col>
          </Row>
          <hr style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
          <Row>
            <Col>
              <Form.Group controlId="rating">
                <Form.Label>Rate this recipe!</Form.Label>
                <Form.Control type="number" value={null} onChange={(e) => setUserRating(e.target.value)} />
              </Form.Group>
              <Button variant="secondary" type="submit" onClick={(e) => handleRating(e, location.state.recipeInfo[0].RecipeID)}>
                  Submit Your Rating
              </Button>
            </Col>
          </Row>
        </Form>
      </div></>
    );
  };
  
  export default RecipeInfo;
