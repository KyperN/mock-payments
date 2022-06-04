import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.scss';
import './Registration.scss';
export default function Registration() {
  const [credentials, setCredentials] = useState({
    name: '',
    password: '',
    balance: null,
  });
  const navigate = useNavigate();

  const displayErr = (msg) => {
    alert(msg);
  };
  const handleUsername = (e) => {
    setCredentials((prev) => {
      return { ...prev, name: e.target.value };
    });
  };
  const handlePassword = (e) => {
    setCredentials((prev) => {
      return { ...prev, password: e.target.value };
    });
  };
  const handleBalance = (e) => {
    setCredentials((prev) => {
      return { ...prev, balance: e.target.value };
    });
  };
  const handleRegister = async () => {
    try {
      await axios
        .post('http://localhost:3001/create-user', {
          name: credentials.name,
          password: credentials.password,
          balance: credentials.balance,
        })
        .then((res) => console.log(res))
        .then(() => {
          navigate('/');
        });
    } catch (err) {
      displayErr('User exists');
      return err;
    }
  };

  const validate = () => {
    !credentials.name || !credentials.password || !credentials.balance
      ? displayErr('Check input fields')
      : handleRegister();
  };

  return (
    <div className="input-block">
      <input
        onChange={(e) => {
          handleUsername(e);
        }}
        placeholder="Username"
        type="text"
      />
      <input
        onChange={(e) => {
          handlePassword(e);
        }}
        placeholder="Password"
        type="password"
      />
      <input
        type="text"
        onChange={(e) => {
          handleBalance(e);
        }}
        placeholder="Balance"
      />
      <button onClick={validate}>Submit</button>
    </div>
  );
}
