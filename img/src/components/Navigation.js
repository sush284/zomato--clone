import React, { useState } from "react";
import { Form, Navbar, Nav, Modal, Button, Alert } from "react-bootstrap";
import "../index.css";
import {basePath,authentication} from '../api/index.js'
import axios from 'axios';
// import {axiosInstanceWithoutToken} from "../api/axios"
import jwt_decode from 'jwt-decode';
export default function Navigation() {
  const [authenticated,setAuthenticated] = useState(false);
  const [show, handleLoginShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [decodedToken,setDecodedToken]=useState(null);
  const [signUpShow, handleSignUpClose] = useState(false);

  
  return (
    <div>
      <Navbar bg="red" className="navBarStyle" expand="lg">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Label>Email/UserName</Form.Label>
            <Form.Control value={username} type="email" placeholder="enter email" onChange={handleEmailChange}/>

            <Form.Label>Password</Form.Label>
            <Form.Control value={password} type="password" placeholder="enter password" onChange={handlePasswordChange}/>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={callAuthenticate}>Login</Button>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          </Modal.Footer>
        </Modal>
        <Modal show={signUpShow} 
        onHide={closeSignUpModal}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Label>Email/UserName</Form.Label>
            <Form.Control value={username} type="email" placeholder="Enter Email" onChange={handleEmailChange}/>

            <Form.Label>Password</Form.Label>
            <Form.Control value={password} type="password" placeholder="Enter Password" onChange={handlePasswordChange}/>

            <Form.Label>Re-Enter Password</Form.Label>
            <Form.Control value={password} type="password" placeholder="Re-enter Password" onChange={handlePasswordChange}/>
            <Alert key={"danger"} variant={"danger"}>
              Passwords should Match
        </Alert>
          
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleSignupClick}>Sign Up</Button>
            <Button variant="secondary" onClick={closeSignUpModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
        <Navbar.Brand className="show hide" href="#home">
          <p className="brandLogoTop">e!</p>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
        
          <Nav className="justify-content-end">
            {!authenticated && <Button onClick={handleLogin} variant="outline-dark" className="navButton">Login</Button>}
           
            {authenticated && <h1>Welcome {decodedToken.userDetails.username}  <Button variant="outline-light" className="navButton pull-right" onClick={handleLogout} >Log Out</Button></h1>
            }
            
            <Button
              onClick={openSignUpModal}
              variant="outline-dark" 
              className="navButton2"
            >
              Create an Account
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );

  function handleLogin()
{
handleLoginShow(true);
}

function handleSignUp()
{
  
}
function handleClose()
{
  handleLoginShow(false);
}
function callAuthenticate()
{
// receive username and password and send to the server
const payload={
  'username':username,
  'password':password,
}
const URL=`${basePath}${authentication.login}`;

axios.post(URL,payload).then((res)=>
{
  if(res.status===200)
  {
    const encodedToken= res.data.data.token;
    sessionStorage.setItem('token', encodedToken);
    handleClose();
    setAuthenticated(true);
    const decoded=jwt_decode(encodedToken);
    console.log("decoded token is " +decoded.userDetails.username );
    setDecodedToken(decoded);
   

  }
console.log(res.data.data);
})
console.log("payload is " +payload);
console.log(" Decoded token is "+decodedToken);
}

function handleEmailChange(event)
{
console.log(event.target.value);

setUsername(event.target.value);
}
function handlePasswordChange(event)
{
console.log(event.target.value);

  setPassword(event.target.value);

}
function closeSignUpModal(event)
{
  console.log(event);
  handleSignUpClose(false);  
}
function handleSignupClick()
{

}
function openSignUpModal()
{
  handleSignUpClose(true);
}

function handleLogout()
{
  sessionStorage.clear();
  reset();
}


function reset()
{
  setAuthenticated(false);
  setUsername('');
  setPassword('');
  setDecodedToken(null);
  handleLoginShow(false);
}


}
