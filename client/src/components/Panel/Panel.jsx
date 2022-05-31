import React from 'react';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Panel.scss';

export default function Panel() {
  const [visible, setVisible] = useState(false);
  const userData = useSelector((state) => state.user.loggedUserData);
  const modalHandler = () => {
    setVisible(!visible);
  };
  return (
    <div className="user-panel">
      <h1 className="welcome">Welcome {userData.name} </h1>
      <p>Your current balance:</p>
      <div
        style={visible ? { opacity: 0.2 } : { opacity: 1 }}
        className="user-panel-content">
        <div className="user-panel-item">
          <h1>$ {userData.balance}</h1>
        </div>
      </div>
      <div
        style={visible ? { display: 'flex' } : { display: 'none' }}
        className="modal">
        <Modal />
      </div>
      <div className="user-panel-control">
        <button onClick={modalHandler}>+</button>
      </div>
    </div>
  );
}
