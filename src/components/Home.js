import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ token }) => {
  return (
    <div>
        <h1>Welcome to Fitness Tracker!</h1>

        <p id='homeP'>Browse activities and routines and make an account to create your own.</p>

        { !token ?
            <p id='homeP'>New User? 
            <span> <Link to='Register'>Sign up here</Link></span>
            </p>
        : 
            null
        }
    </div>
  );
};

export default Home;