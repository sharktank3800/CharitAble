import { useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form'

import { NavLink, useNavigate } from "react-router-dom";

import { useStore } from "./Store";

const initalFormData = {
    email: '',
    password: ''
}

const REGISTER_USER = gql`
mutation RegisterUser($email: String!, $password: String!){
    register(email: $email, password: $password){
        _id
        email
    }
}
`

const LOGIN_USER = gql`
mutation LoginUser($email: email!, $password: password!){
    login(email:$email, password: $password){
        _id
        email
    }
}
`

function Auth(){

}
module.exports = Auth