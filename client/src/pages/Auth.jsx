import { useState } from "react";
import { useMutation , gql } from "@apollo/client";

import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form'
import { FormLabel } from "react-bootstrap";

import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../Store";


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
    }
}
`

function Auth({isLogin}){
    console.log(isLogin)
    const {setState} = useStore()
    const [formdata,setFormData] = useState(InitalFormData);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const [authenticateUser] = useMutation(isLogin ? LOGIN_USER : REGISTER_USER,{
        variables:formdata,
        onCompleted: (data) => {
            console.log('mutationdata',data);
          }
    })



    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        })
        console.log(formdata)
    }

    
  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log(formdata)

    try {
       

        const resolverName = isLogin ? 'login' : 'register'
      const { data} = await authenticateUser()
      console.log('Data:', data);
      setFormData({...InitalFormData})
      if (isLogin) {
        // Handle successful login
        setState(oldState => ({
            ...oldState,
            user: data[resolverName],
        }))
        console.log('Logged in:', data.login);
        navigate('/')
      } else {
        // Handle successful registration
        setState(oldState => ({
            ...oldState,
            user: data[resolverName],
        }))
        setErrorMessage('')
        navigate('/')
        console.log('Registered:', data.register);
      }
      
        //   updates state after auth
      setState((oldState) => ({
        ...oldState,
        user: data[isLogin ? 'login' : 'register'],
      }));

      // Redirect or handle successful login/registration
      navigate('/')
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(error.message)
    }
  };





    return ( 
        <Form onSubmit={handleSubmit}>
            
             {!isLogin && <Form.Group controlId="formBasicUsername">
                <FormLabel> Username</FormLabel>
            <Form.Control
            type="text"
            name="username"
            value={formdata.username}
            onChange={handleChange}
            placeholder="Enter email"
            />
            </Form.Group>}

            <Form.Group controlId="formBasicUsername">
                <FormLabel> Email</FormLabel>
            <Form.Control
            type="email"
            name="email"
            value={formdata.email}
            onChange={handleChange}
            placeholder="Enter email"
            />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <FormLabel> Password</FormLabel>
            <Form.Control
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            placeholder="Enter Password"
            />
            </Form.Group>

            <Button variant="primary" type="submit">
            {isLogin ? 'Login' : 'Register'}
            </Button>
        </Form>
    )
}


// module.exports = Auth
export default Auth