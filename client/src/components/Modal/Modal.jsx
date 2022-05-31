import axios from 'axios';
import React, { useState } from 'react';
import './Modal.scss';
import Notification from '../Notification/Notification';
import { useSelector, useDispatch } from 'react-redux';
export default function Modal() {
  const activerUserData = useSelector((state) => state.user.loggedUserData);
  const [disabled, setDisabled] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
  });
  const [transferData, setTransferData] = useState({ user: '', amount: null });
  const dispatch = useDispatch();

  const notificationHandler = (message) => {
    setNotification({ open: true, message: message });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, open: false }));
    }, 2000);
  };

  const handleAmount = (e) => {
    if (parseInt(e.target.value) > parseInt(activerUserData.balance)) {
      console.log(e.target.value, activerUserData.balance);
      setDisabled(true);
      alert('Insufficeint funds');
      e.target.value = '';
    } else {
      setDisabled(false);
      setTransferData((prev) => ({ ...prev, amount: e.target.value }));
    }
  };
  const handleUser = (e) => {
    setTransferData((prev) => ({ ...prev, user: e.target.value }));
  };
  const displayErr = () => {
    alert('Error occured');
  };
  const handleTransfer = async () => {
    const data = {
      fromUserId: activerUserData.id,
      amount: transferData.amount,
      toUser: transferData.user,
    };
    if (transferData.user === activerUserData.name) {
      notificationHandler('Failed');
      throw new Error('Same user transfer');
    }
    try {
      await axios
        .post('http://localhost:3001/send-money', data)
        .then((res) => dispatch({ type: 'SET_USER_DATA', payload: res.data }))
        .then(() => {
          notificationHandler('Success');
        });
    } catch (err) {
      displayErr();
    }
  };
  return (
    <div className="promt">
      <div className="promt-inner">
        <div className="promt-inputs">
          <input
            placholder="Amount"
            onChange={(e) => {
              handleAmount(e);
            }}
            type="number"
          />
          <input
            onChange={(e) => {
              handleUser(e);
            }}
            type="text"
            placeholder="Account name"
          />
          <button
            style={disabled ? { opacity: 0.5 } : {}}
            disabled={disabled}
            onClick={handleTransfer}>
            Send money
          </button>
        </div>
      </div>
      <div
        style={notification.open ? { display: 'block' } : { display: 'none' }}
        className="notification">
        <Notification message={notification.message} />
      </div>
    </div>
  );
}
