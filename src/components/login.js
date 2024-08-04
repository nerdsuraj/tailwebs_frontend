/* eslint-disable no-unused-vars */
import React from 'react'
import './login.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

const Login = ({setApiKey}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('username:', username);
        console.log('password:', password);
        if(username === '' || password === '') {
            toast.error('Please fill all the fields');
            return;
        }
        setLoading(true);
        axios.post('http://localhost:4001/api/user/login', {
            username: username,
            password: password
        }).then((response) => {
            console.log('response:', response);
            if(response.status === 200) {
                toast.success('Login successful');
                setLoading(true);
                localStorage.setItem('token', response.data.apiKey);
                setApiKey(response.data.apiKey);
            } else {
                toast.error(response.data.message);
            }
        }).catch((error) => {
            console.log('error:', error);
            toast.error(error.response.data.message);
        });

    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">tailwebs.</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" placeholder="Shivyadav_63" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} placeholder="********" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="login-button" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
