import React from 'react';
import { useSelector } from 'react-redux';
import Transaction from '../Transaction/Tranasction';
import './Transactions.scss';
import { useState } from 'react';

export default function Transactions() {
  const history = useSelector((state) => state.user.loggedUserData.history);

  const [visible, setVisisble] = useState(false);

  const handle = () => {
    setVisisble(!visible);
  };

  return (
    <div className="transactions" onClick={handle}>
      <h1 className="history">Show history</h1>
      <div
        className="transaction"
        style={visible ? { display: 'block' } : { display: 'none' }}>
        {history.map((elem) => {
          return <Transaction elem={elem} />;
        })}
      </div>
    </div>
  );
}
