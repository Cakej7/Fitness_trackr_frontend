import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ token }) => {
  return (
    <div className='centerDiv' id='homeStyle'>
        <h1>Welcome to Fitness Tracker!</h1>

        <p>Browse activities and routines! Make an account to start making routines unique to you!</p>

        { !token ?
            <p>New User? 
            <span> <Link to='Register'>Sign up here</Link></span>
            </p>
        : 
            null
        }

        <img src='/Home_page_pic.jpg' width="1000" height="700" />
    </div>
  );
};

export default Home;