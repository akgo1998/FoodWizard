import Axios from 'axios';
import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';


function AdvancedQuery1() {
  const [cookingTime, setCookingTime] = useState({});
  const [rating, setRating] = useState({});
  const [ratingsCount, setRatingsCount] = useState({});
  const [restPrice, setRestPrice] = useState({});
  const [adv1Info, setAdv1Info] = useState([]);
  const isMounted = useRef(false);

  let navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3005/api/adv1', {
      cookingTime: cookingTime,
      rating: rating,
      ratingsCount: ratingsCount,
      restPrice: restPrice
    }).then((response) => {
      setAdv1Info(response.data);
      if (response.data.length !== 0) { //figure out why userInfo is changed into a different type when acquired from a hook
        alert("Successful Find!");
      }
    }).catch((err) => {
      alert("This search for recipes has failed.");
    });
  }

  useEffect(() => {
    if (isMounted.current) {
        let path = `/results`;
        navigate(path, {state : {recipeData: adv1Info}});
    } else {
        isMounted.current = true;
    }
  }, [adv1Info]);

  return (
    <Form>
      <Row className="mb-3">
        <Col>
          {/* <Form.Label>
            Select recipe ID, recipe name, and cooking time where cooking time, rating, ratings count, and restaurant price have a threshold
          </Form.Label> */}
          <h1>Display Recipes With Certain Filters</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Label>Max Cooking Time</Form.Label>
          <Form.Control type="number" value={null} onChange={(e) => setCookingTime(e.target.value)} />
        </Col>
        <Col>
          <Form.Label>Min Rating</Form.Label>
          <Form.Control type="number" value={null} onChange={(e) => setRating(e.target.value)} /> 
        </Col>
        <Col>
          <Form.Label>Min Ratings Count</Form.Label>
          <Form.Control type="number" value={null} onChange={(e) => setRatingsCount(e.target.value)} />
        </Col>
        <Col>
          <Form.Label>Max Rest price</Form.Label>
          <Form.Control type="number" value={null} onChange={(e) => setRestPrice(e.target.value)} />
        </Col>
      </Row>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
      </Button>
    </Form>
  )
}
export default AdvancedQuery1;
