import Axios from 'axios';
import { useLocation } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Results.css';
import Home from './Home.js';

const Results = () => {
    const location = useLocation();

    return (
      <><Home />
          {location.state.restData[0].map(restaurant => (
              <Row>
                <div className = 'btn background'>
                    <h3>{restaurant.RestaurantName}</h3>
                    <Row>
                        <Col>
                            <h4>Cost: {restaurant.DollarSign}</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>Recipe Served: {restaurant.RecipeName}</h6>
                        </Col>
                        <Col>
                            <h6>Price of Dish: {restaurant.Rest_Price}</h6>
                        </Col>
                    </Row>
                </div>
              </Row>
          ))}
      </>
    );
  };
  
  export default Results;
