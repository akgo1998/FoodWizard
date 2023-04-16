import ReactDOM from "react-dom";
import Axios from 'axios';
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { React, useState, useEffect, useRef } from "react";
import { Col, Row, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Results.css';
import './Page.css';
import SignInNav from "./Navbar";

const UserInfo = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [favRecipeName, setFavRecipeName] = useState('');

    const location = useLocation();
    
    const getRecipe = (recipeID) => {
        Axios.post('http://localhost:3005/api/getRecipeInformation', {
            recipeID: recipeID
        }).then((response) => {
            if (response.data.length !== 0) {
                setFavRecipeName(response.data[0].RecipeName);
            }
        }).catch((err) => {
            // setFavRecipeName('No favorite recipe.')
        });
}
    getRecipe(location.state.acquiredUserInfo.FavRecipeID);

    let navigate = useNavigate();

    const deleteUser = (event, userID) => {
        event.preventDefault();
        Axios.post('http://localhost:3005/api/deleteUser', {
            userID: userID
        }).then((response) => {
          if (response.data.length !== 0) {
              alert("Account has been deleted! Goodbye </3");
              let path = `/signup`;
              navigate(path);
          }
        }).catch((err) => {
          alert("We were unable to submit your rating");
        });
    }

    const handlePasswordUpdate = (event, userID) => {
        event.preventDefault();
        Axios.post('http://localhost:3005/api/updatePassword', {
            userID: userID,
            userPassword: oldPassword,
            newUserPassword: newPassword
        }).then((response) => {
          if (response.data.length !== 0) {
              alert("Password has been updated!");
          }
          let path = `/user`;
          navigate(path);
        }).catch((err) => {
          alert("We were unable to update your password!");
        });
    }



    return (
        <>
            <SignInNav />
            <div class='background'>
                <div style={{"textAlign": "center"}}>
                    <hr style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
                    <Row>
                        <h1>Welcome, {location.state.acquiredUserInfo.Name}!</h1>
                    </Row>
                    <Row>
                        <Col>
                            <h3>Favorite Recipe: {favRecipeName}</h3>
                        </Col>
                        <Col>
                            <h3>Favorite Cuisine: {location.state.acquiredUserInfo.FavCuisine}</h3>
                        </Col>
                    </Row>
                    <hr style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
                </div>
                <div style={{"textAlign": "center"}}>
                    <Row>
                        <Col>
                            <h3>User ID: {location.state.acquiredUserInfo.UserID}</h3>
                        </Col>
                    </Row>
                    <hr style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
                </div>
                <div>
                    <Row>
                        <Col>
                            <div class='padding-left'>
                                <Form.Group controlId="rating">
                                    <Form.Label>Old Password</Form.Label>
                                    <Form.Control type="text" value={null} onChange={(e) => setOldPassword(e.target.value)} />
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="text" value={null} onChange={(e) => setNewPassword(e.target.value)} />
                                </Form.Group>
                            </div>
                        </Col>
                        <Col>
                            <div class='padding-top' style={{textAlign: 'center'}}>
                                <Button style={{width: 300, height: 100}} variant="secondary" type="submit" onClick={(e) => handlePasswordUpdate(e, location.state.acquiredUserInfo.UserID)}>
                                    <h2>Update Password!</h2>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <hr style={{borderBottomColor: 'black', borderBottomWidth: 1}}/>
                </div>


                <div  style = {{textAlign: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Button  style = {{backgroundColor: 'red', color: 'white'}} className ="btn btn-danger" type="button" onClick={(e) => deleteUser(e, location.state.acquiredUserInfo.UserID)}>
                        DELETE MY ACCOUNT
                    </Button>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
