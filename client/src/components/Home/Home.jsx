import React from 'react';
import './Home.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import Panel from '../Panel/Panel';
export default function Home() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.app.loading);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  const fetchUserData = async () => {
    dispatch({ type: 'LOADING' });

    setTimeout(() => {
      dispatch({ type: 'LOADED' });
    }, 1500);
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className="container">
      {loading ? (
        <div className="center">
          <h1>Fetching user data...</h1>
          <Loader />
        </div>
      ) : (
        <Panel />
      )}
      <div className="btn">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
