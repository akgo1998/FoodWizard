import Axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import { Col, Row, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function AdvancedQuery2() {
  const [difference, setDifference] = useState({});
  const [adv2Info, setAdv2Info] = useState([]);
  const isMounted = useRef(false);
    
  let navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3005/api/adv2', {
      difference: difference
    }).then((response) => {
      setAdv2Info(response.data);
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
        navigate(path, {state : {recipeData: adv2Info}});
    } else {
        isMounted.current = true;
    }
}, [adv2Info]);

  return (
    <Form>
      {/* <Row className="mb-3">
        <Col>
          <h1>Advanced Query 2</h1><br></br>
          <Form.Label>Select recipe name, restaurant name, restaurant price, and store price where the difference between restaurant price and store price has a threshold</Form.Label>
        </Col>
      </Row> */}
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="difference">
              <h1>Difference Between Restaurant Price and Store Price</h1>
              <Form.Control type="text" value={null} onChange={(e) => setDifference(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
        </Button>
    </Form>
  )
}
export default AdvancedQuery2;
