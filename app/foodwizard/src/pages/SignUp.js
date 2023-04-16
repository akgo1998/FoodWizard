import ReactDOM from "react-dom";
import Axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Page.css';
import SignUpNav from "./SignUpNav.js";

function SignUp() {
  const [formGriduserID, setUserID] = useState("");
  const [formGridPassword, setPassword] = useState("");
  const [formGridName, setName] = useState("");
  const [formGridFavCuisine, setCuisine] = useState("");
  const [signUpInfo, setSignUpInfo] = useState("");
  const isMounted = useRef(false);

  let navigate = useNavigate(); 

  function validateForm() {
    return formGriduserID.length > 0 && formGridPassword.length > 0;
  }

function handleSubmit(event) {
    event.preventDefault();
    Axios.post('http://localhost:3005/api/createUser', {
      userID: formGriduserID,
      userPassword: formGridPassword,
      name: formGridName,
      userFavCuis: formGridFavCuisine
    }).then((response) => {
      setSignUpInfo(response.data);
      if (response.data.length) { //figure out why userInfo is changed into a different type when acquired from a hook
        alert("Successfully Created Your Account!");
      } else if (response.data.length == 0) {
        alert("User Sign Up Failed");
      } 
    }).catch((err) => {
      alert("This user sign up has failed.");
    });
  }

  useEffect(() => {
    if (isMounted.current) {
      let path = `/user`;
      navigate(path, {state : {userInfo: signUpInfo}});
    } else {
      isMounted.current = true;
    }
  }, [signUpInfo]);

return(
   <>
  <SignUpNav />
  <div class='background'>
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridUserID">
          <Form.Label>User ID</Form.Label>
          <Form.Control type="text" placeholder="Enter User ID" onChange={(e) => setUserID(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridFavCuisine">
        <Form.Label>Enter your favorite cuisine</Form.Label>
        <Form.Control placeholder="American, Chinese.." onChange={(e) => setCuisine(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="I'm human" />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  </div></>
) };

export default SignUp;
