import React, { useState, useEffect } from "react";
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import { Navigate, Redirect } from "react-router-dom";

export const Register = (props) => {

    useEffect(() => {
        
    }, []);

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        axios.put('http://localhost:8080/auth/signup', {
            email: email,
            password: pass,
            name: name
        })
        .then(result => {
            console.log(result.data);
            <Navigate to="/save" />
        });
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}