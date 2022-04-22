import { useState, useContext } from 'react';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import logo from '../assets/DumbMerch.png';
import { useNavigate, Link } from "react-router-dom";

import { UserContext } from "../context/userContext";


import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';

import { API } from '../config/api';


// import Home from './Home.js'


function Login() {

    let navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext);

    const checkAuth = () => {
        if (state.isLogin === true) {
        navigate("/");
        }
    };
    checkAuth();

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const { email, password } = form;

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        // Configuration
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
  
        // Data body
        const body = JSON.stringify(form);
  
        // Insert data for login process
        const response = await API.post('/login', body, config);
  
        // Checking process
        if (response?.status === 200) {
          // Send data to useContext
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data.data,
          });
  
          // Status check
          if (response.data.data.status === 'admin') {
            navigate('/complain-admin');
          } else {
            navigate('/');
          }
  
          const alert = (
            <Alert variant="success" className="py-1">
              Login success
            </Alert>
          );
          setMessage(alert);
        }
      } catch (error) {
        const alert = (
          <Alert variant="danger" className="py-1">
            Login failed
          </Alert>
        );
        setMessage(alert);
        console.log(error);
      }
    });

  return (
        <>
        <Container className="text-white" fluid style={{ minHeight: '100vh' ,backgroundColor: 'black'}}>
   
            <Row> 
                <Col> 
                    <Container style={{ marginTop: '100px', marginLeft:'100px'}}>
                        <img src={logo} className="App-logo" alt="logo" />
                        
                        <p className="text-left" style={{ marginTop: '20px', marginBottom: '20px', fontSize:"60px"}}>Easy, Fast and Reliable</p>

                        <p style={{ marginBottom: '0px', color: '#6A6A6A'}}>Go shopping for merchandise, just go to dumb merch</p>
                        <p style={{ color: '#6A6A6A'}}>shopping. the biggest merchandise in <b>Indonesia</b></p>

                        <div style={{ marginTop: '50px'}}>

                            <Button onClick={handleNavigateToLogin} style={{ padding: '5px 35px'}} variant="danger" type="submit">
                                        Login
                            </Button>

                            <Link to="/register" style={{ color: '#6A6A6A', 
                                                        fontWeight: '700', 
                                                        marginLeft:'30px', 
                                                        textDecoration:'none'}}> Register </Link>
                        </div>
                    
                    </Container>
                </Col>

                <Col clasName='mt-50 bg-white'>

                    <Container  style={{ 
                        backgroundColor: '#181818', 
                        width:'350px', 
                        borderRadius:'10px' , 
                        marginTop: '150px', 
                        paddingTop:'20px',
                        paddingBottom:'20px',}}>
                            {message && message}
                            <p className="h3 text-left">Login</p>
                     
                            <form onSubmit={(e) => handleSubmit.mutate(e)}>
                                <div className="mt-3 form">
                                    <input  type="email"
                                            placeholder="Email"
                                            value={email}
                                            name="email"
                                            onChange={handleChange}
                                            className=" mt-3 px-3 py-2"
                                            />

                                    <input type="password"
                                            placeholder="Password"
                                            value={password}
                                            name="password"
                                            onChange={handleChange}
                                            className="mt-3 px-3 py-2"
                                            />
                                </div>
                                
                                <div className="d-grid gap-2 mt-5">
                                    <button className="btn btn-login">Login</button>
                                 </div>
                            </form>
                    </Container>
                </Col>
            </Row>
        </Container>
        </>  
  );
}

export default Login;

