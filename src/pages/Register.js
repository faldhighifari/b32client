import { useState, useContext } from 'react';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import logo from '../assets/DumbMerch.png';
import { useNavigate, Link } from "react-router-dom";

import { UserContext } from "../context/userContext";


import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';

import { API } from '../config/api';



function Register() {

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
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/register', body, config);

      // Notification
      if (response.data.status === 'success...') {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          name: '',
          email: '',
          password: '',
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    //   <div style={{ minHeight: '100vh' , backgroundColor: 'blue' }}>
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

                <p className="h3 text-left">Register</p>
                {message && message}
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                    <div className="mt-3 form">
                        <input type="text"
                        placeholder="Name"
                        value={name}
                        name="name"
                        onChange={handleChange}
                        className="px-3 py-2"
                        />
                        <input type="email"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={handleChange}
                        className="px-3 py-2 mt-3"
                        />
                        <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        name="password"
                        onChange={handleChange}
                        className="px-3 py-2 mt-3"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-5">
                        <button type="submit" className="btn btn-login">
                        Register
                        </button>
                    </div>
                    </form>
                    </Container>
            </Col>
        </Row>
      
    </Container>
    // </div>
  );
}

export default Register;

