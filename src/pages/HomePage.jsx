import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuote } from '../redux/actions/quote';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetched_quote } = useSelector((state) => state.randomQuote);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('first_name');
    navigate('/');
  };

  const getGreetingByTime = () => {
    // Get the user's timezone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Get the current time in the user's timezone
    const currentTime = new Date().toLocaleTimeString('en-US', {
      timeZone: userTimeZone,
      hour12: false,
    });

    // Extract the hour from the current time
    const currentHour = parseInt(currentTime.split(':')[0], 10);

    // Determine the greeting based on the current hour
    let greeting;
    if (currentHour >= 5 && currentHour < 12) {
      greeting = 'Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = 'Afternoon';
    } else {
      greeting = 'Night';
    }

    return `${greeting}`;
  };

  useEffect(() => {
    dispatch(fetchQuote());
  }, []);

  const firstName = localStorage.getItem('first_name');
  return (
    <div className="flex items-center bg-white w-full h-full">
      <div
        id="m-auto"
        className="flex flex-col bg-white w-full md:w-[500px] min-h-3/4 rounded-lg p-4 pb-8 shadow-2xl m-auto"
      >
        <div className="flex flex-col w-4/5 max-w-[400px] mx-auto">
          <h1 className="font-bold text-fontBlack  text-center text-xl">
            {' '}
            Good {getGreetingByTime()} {firstName}!
          </h1>
          <div className="my-6">
            <p className="text-center">{fetched_quote?.quote}</p>
            <p className="text-center italic mt-4">{fetched_quote?.author}</p>
          </div>

          <Button
            content="Logout"
            type="button"
            onClick={handleLogout}
            loading={false}
            btnColor="primary"
            style="text-white w-full h-[40px] mt-4"
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
