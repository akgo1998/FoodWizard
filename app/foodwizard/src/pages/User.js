import ReactDOM from "react-dom";
import Axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { React, useState, useEffect, useRef } from "react";
import './Page.css';

import { useNavigate } from "react-router-dom";
// import { bootstrapUtils } from "react-bootstrap/lib/utils";
// import css file
import Home from "./Home";

const User = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [acquiredUserInfo, setacquiredUserInfo] = useState("");
  const isMounted = useRef(false);

  let navigate = useNavigate(); 

  function validateForm() {
    return userID.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    Axios.post('http://localhost:3005/api/getUser', {
      userID: userID,
      password: password
    }).then((response) => {
      if (response.data.length === 1) { //figure out why userInfo is changed into a different type when acquired from a hook
        alert("Successful Find!");
        setacquiredUserInfo(response.data[0]);
      } else if (response.data.length === 0) {
        alert("User Authentication Failed");
      } else {
        alert("Multiple Users?");
      }
    }).catch((err) => {
      alert("This search for user has failed.");
    });
  }

  useEffect(() => {
    if (isMounted.current) {
      let path = `/userInfo`;
      navigate(path, {state : {acquiredUserInfo: acquiredUserInfo}});
    } else {
      isMounted.current = true;
    }
  }, [acquiredUserInfo]);

  return (
    <>
    <div className="Login background">
      <Home />
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <label>User ID</label>
          <Form.Control
            autoFocus
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group><br></br>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div></>
  );

}
export default User;
