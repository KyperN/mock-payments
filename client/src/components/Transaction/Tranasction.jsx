import React from 'react';
import './Transaction.scss';
export default function Tranasction({ elem }) {
  const display = () => {
    if ('to' in elem) {
      return <p className="red">You sent to:</p>;
    }
    if ('from' in elem) {
      return <p className="green">You received from :</p>;
    } else {
      return <p className="green">Topup:</p>;
    }
  };
  return (
    <div className="transaction">
      {display()}
      <p className="user">{elem.to || elem.from}</p>
      <p className="info">{elem.amount} $</p>
    </div>
  );
}
