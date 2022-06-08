import React from 'react';
import './Notification.scss';
export default function Notification({ message }) {
  return (
    <div className="notification">
      <div
        className={
          message === 'Failed'
            ? 'notification-content fail'
            : 'notification-content success'
        }>
        <p>{message}</p>
      </div>
    </div>
  );
}
