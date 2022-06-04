import axios from 'axios';
import { useState } from 'react';
import Notification from '../Notification/Notification';
import { useSelector, useDispatch } from 'react-redux';
export default function BalanceModal() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
  });
  const userId = useSelector((state) => state.user.loggedUserData.id);

  const amountHandler = (e) => {
    setAmount(e.target.value);
  };

  const notificationHandler = (message) => {
    setNotification({ open: true, message: message });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, open: false }));
    }, 2000);
  };

  const addBalance = async () => {
    if (amount === '') {
      notificationHandler('Failed');
    } else {
      const transferData = { amount: amount, userId: userId };
      await axios
        .post('http://localhost:3001/add-money', transferData)
        .then((res) => dispatch({ type: 'SET_USER_DATA', payload: res.data }))
        .then(() => {
          notificationHandler('Success');
        });
    }
  };

  return (
    <div className="promt">
      <div className="promt-inner">
        <div className="promt-inputs">
          <input
            type="numbers"
            onChange={(e) => {
              amountHandler(e);
            }}
            placholder="Amount"
          />
          <button onClick={addBalance}>Add</button>
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
