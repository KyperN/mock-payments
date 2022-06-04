import axios from 'axios';
import React, { useState } from 'react';
import './TransferModal.scss';
import Notification from '../Notification/Notification';
import { useSelector, useDispatch } from 'react-redux';
export default function TransferModal() {
  const activeUserData = useSelector((state) => state.user.loggedUserData);
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
    if (
      parseInt(e.target.value) > parseInt(activeUserData.balance) ||
      parseInt(activeUserData.balance) <= 0
    ) {
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

  const handleTransfer = async () => {
    const data = {
      fromUserId: activeUserData.id,
      amount: transferData.amount,
      toUser: transferData.user,
    };
    if (transferData.user === activeUserData.name) {
      notificationHandler('Failed');
      setTransferData({ user: '', amount: null });
      throw new Error('Same user transfer');
    }
    if (activeUserData.balance <= 0) {
      notificationHandler('Failed');
      throw new Error('Low balance');
    }
    try {
      await axios
        .post('http://localhost:3001/send-money', data)
        .then((res) => dispatch({ type: 'SET_USER_DATA', payload: res.data }))
        .then(() => {
          notificationHandler('Success');
          setTransferData({ user: '', amount: '' });
        });
    } catch (err) {
      setTransferData((prev) => ({ ...prev, amount: '' }));
      notificationHandler('Failed');
    }
  };
  return (
    <div className="promt">
      <div className="promt-inner">
        <div className="promt-inputs">
          <input
            value={transferData.amount}
            placholder="Amount"
            onChange={(e) => {
              handleAmount(e);
            }}
            type="number"
          />
          <input
            value={transferData.user}
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
