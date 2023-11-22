import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form'
import { FormLabel } from "react-bootstrap";

import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../Store";

import Featured from "../components/Featured";


const InitalFormData = {
  email: '',
  password: '',
  username: ''
}

const REGISTER_USER = gql`
mutation RegisterUser($email: String!, $username: String!, $password: String!){
    register(email: $email, username: $username, password: $password){
        username
        email
        password
    }
}
`

const LOGIN_USER = gql`
mutation LoginUser($email: String!, $password: String!){
    login(email:$email,  password: $password){
        email
        password
        username
        _id
        token
    }
}
`

function Auth({ isLogin }) {
  const { setState } = useStore();
  const [formdata, setFormData] = useState(InitalFormData);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [authenticateUser] = useMutation(isLogin ? LOGIN_USER : REGISTER_USER, {
    variables: formdata,
    onCompleted: (data) => {
      handleAuthSuccess(data);
    }
  });

  const handleAuthSuccess = (data) => {
    console.log('authdata',data)
    const resolverName = isLogin ? 'login' : 'register';
    setState(oldState => ({
      ...oldState,
      user: data[resolverName],
      token: data[resolverName]?.token || ''
    }));
    localStorage.setItem('token', data[resolverName]?.token || ''); // Storing the token in local storage
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authenticateUser();
      console.log('authdata',data)
      setFormData({ ...InitalFormData });
      handleAuthSuccess(data);
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(error.message);
    }
  };




  return (
    <>
    <Featured /> 
    <Form onSubmit={handleSubmit}>
      <div className="form-group">
        {!isLogin && <Form.Group controlId="formBasicUsername">
          <FormLabel></FormLabel>
          <Form.Control
            type="text"
            name="username"
            value={formdata.username}
            onChange={handleChange}
            placeholder="Pick your Username"
          />
        </Form.Group>}

        <Form.Group controlId="formBasicUsername">
          <FormLabel></FormLabel>
          <Form.Control
            type="email"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <FormLabel></FormLabel>
          <Form.Control
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
        </Form.Group>
      <Button className="login_btn" variant="primary" type="submit">
        {isLogin ? 'Login' : 'Register'}
      </Button>
      </div>

    </Form>
    </>
  )
}

export default Auth