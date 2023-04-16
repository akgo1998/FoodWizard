import Axios from 'axios';
import { Col, Row, Form } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Form.css'

const SearchFilters = () => {
    const [cuisine, setCuisine] = useState(null);
    const [minRating, setMinRating] = useState(null);
    const [maxCookingTime, setMaxCookingTime] = useState(null);
    const [servingSize, setServingSize] = useState(null);
    const [keyword, setKeyword] = useState(null);
    const [searchFiltersInfo, setSearchFiltersInfo] = useState([]);
    const isMounted = useRef(false);

    let recipeInfo = [];
    
    let navigate = useNavigate(); 
    

    const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3005/api/mainSearch', {
        cuisine: cuisine,
        minRating: minRating,
        maxCookingTime: maxCookingTime,
        servingSize: servingSize,
        keyword: keyword
    }).then((response) => {
        setSearchFiltersInfo(response.data);
        recipeInfo = response.data;
        if (response.data.length !== 0) {
            alert("Successful Find!");
        }
    }).catch((err) => {
        alert("This search for user has failed.");
    });
        
}

    useEffect(() => {
        if (isMounted.current) {
            let path = `/results`;
            navigate(path, {state : {recipeData: searchFiltersInfo}});
        } else {
            isMounted.current = true;
        }
    }, [searchFiltersInfo]);

    return (
        <Form>
            <Row className="mb-3">
                <Col>
                    <h1>Find Your Recipe</h1>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="cuisine">
                        <Form.Label>Cuisine</Form.Label>
                        <Form.Control type="text" value={null} onChange={(e) => setCuisine(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="minRatings">
                        <Form.Label>Minimum Rating</Form.Label>
                        <Form.Control type="text" value={null} onChange={(e) => setMinRating(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="maxCookingTime">
                        <Form.Label>Max Cooking Time</Form.Label>
                        <Form.Control type="text" value={null} onChange={(e) => setMaxCookingTime(e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="servingSize">
                        <Form.Label>Serving Size</Form.Label>
                        <Form.Control type="text" value={null} onChange={(e) => setServingSize(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="keyword">
                        <Form.Label>Keyword</Form.Label>
                        <Form.Control type="text" value={null} onChange={(e) => setKeyword(e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    )
};

export default SearchFilters;