import React, { useState, useEffect } from "react";
import { Link, redirect} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        axios.post('http://localhost:8080/auth/login', {
            email: email,
            password: pass
        })
        .then(result => {
            console.log(result.data);
            const data = result.data;
            // <Navigate to="/save" />
            navigate('/save' ,{state:{data}});
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" >Log In</button>
            </form>
            <button  className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}
//to="/features"