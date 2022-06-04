import React from 'react';
import TransferModal from '../TransferModal/TransferModal';
import BalanceModal from '../BalanceModal/BalanceModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Panel.scss';

export default function Panel() {
  const [visible, setVisible] = useState({ transfer: false, balance: false });
  const userData = useSelector((state) => state.user.loggedUserData);
  const modalHandlerTransfer = () => {
    setVisible((prev) => ({ transfer: !prev.transfer, balance: false }));
  };
  const modalHandlerBalance = () => {
    setVisible((prev) => ({
      transfer: prev.transfer,
      balance: !prev.balance,
    }));
  };
  return (
    <div className="user-panel">
      <h1 className="welcome">Welcome {userData.name} </h1>
      <p>Your current balance:</p>
      <div className="user-panel-content">
        <div className="user-panel-item">
          <h1>$ {userData.balance}</h1>
        </div>
      </div>
      <div
        style={
          visible.transfer || visible.balance
            ? { display: 'flex' }
            : { display: 'none' }
        }
        className="modal">
        {visible.transfer ? <TransferModal /> : <BalanceModal />}
      </div>
      <div className="modal"></div>
      <div className="user-panel-control">
        <button onClick={modalHandlerTransfer}>+</button>
      </div>
      <div className="user-panel-control">
        <button onClick={modalHandlerBalance} className="money">
          Add money
        </button>
      </div>
    </div>
  );
}
