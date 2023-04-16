import Axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { Col, Row, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function StoredProcedure() {
  const [keyword, setKeyword] = useState({});
  const [keyInfo, setKeyInfo] = useState([]);
  const isMounted = useRef(false);
    
  let navigate = useNavigate(); 
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3005/api/restaurantPriceRank', { //Get the actual path
      keyword: keyword,
    }).then((response) => {
      setKeyInfo(response.data);
      if (response.data.length !== 0) { //figure out why userInfo is changed into a different type when acquired from a hook
        alert("Successful Find!");
      }
    }).catch((err) => {
      // alert("This search for user has failed.");
    });
  }

  useEffect(() => {
    if (isMounted.current) {
        let path = `/restaurantPrice`;
        navigate(path, {state : {restData: keyInfo}});
    } else {
        isMounted.current = true;
    }
}, [keyInfo]);

  return (
    <Form className="mb-3">
      <Row className="mb-3">
        <Col>
          <Form.Group size="lg" controlId="StoredProcedure">
            <h1>Price of Restaurants</h1>
            <Form.Label>Keyword</Form.Label>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Control
            autoFocus
            type="text"
            value={null}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
      </Row>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>

    </Form>
    
    )
}
export default StoredProcedure;
