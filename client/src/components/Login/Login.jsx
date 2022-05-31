import React from 'react';
import './Login.scss';
import Loader from '../Loader/Loader';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
  //HOOKS
  const [credentials, setCredentials] = useState({
    name: '',
    password: '',
  });
  const loading = useSelector((state) => state.app.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //HANDLERS

  const displayError = (text) => {
    alert(text);
  };

  const setName = (e) => {
    setCredentials((prev) => ({ ...prev, name: e.target.value }));
    console.log(credentials);
  };

  const setPassword = (e) => {
    setCredentials((prev) => ({ ...prev, password: e.target.value }));
    console.log(credentials);
  };

  const handleLogin = async () => {
    const { name, password } = credentials;
    if (name === '' || password === '') {
      displayError('Check inputs');
    } else {
      try {
        await axios
          .post('http://localhost:3001/login', credentials)
          .then((res) => {
            console.log(res.data);
            dispatch({ type: 'SET_USER_DATA', payload: res.data });
          });
        dispatch({ type: 'LOGIN' });
        dispatch({ type: 'LOADING' });
        setTimeout(() => {
          dispatch({ type: 'LOADED' });

          navigate('/home');
        }, 1500);
      } catch (err) {
        displayError('Wrong credentials');
      }
    }
  };

  return (
    <div className={'input-block'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <input
            onChange={(e) => {
              setName(e);
            }}
            placeholder="Username"
            type="text"
          />
          <input
            onChange={(e) => {
              setPassword(e);
            }}
            placeholder="Password"
            type="password"
          />
          <button onClick={handleLogin}>Login</button>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </>
      )}
    </div>
  );
}
