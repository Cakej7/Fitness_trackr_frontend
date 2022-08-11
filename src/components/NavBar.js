import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const NavBar = ({ token }) => {

    const handleLogOut = (cb) => {
        localStorage.removeItem("JWT");
        cb()
    };

    return (
        <div >
                <Navbar bg="primary" variant="dark" >
                    <Container id='nav'>
                    <Navbar.Brand href="/"></Navbar.Brand>
                        <Nav  >
                            <Nav.Link className='navText' style={{color: 'white'}} href="/">Home</Nav.Link>
                            <Nav.Link className='navText' style={{color: 'white'}} href="/Activities">Activities</Nav.Link>
                            <Nav.Link className='navText' style={{color: 'white'}} href="/Routines">Public Routines</Nav.Link>
                            {token ?
                                <Nav.Link className='navText' style={{color: 'white'}} href="/MyRoutines">My Routines</Nav.Link>
                                :
                                null
                            }
                            {token ?
                                <Nav.Link className='navText' style={{color: 'white'}} href="/"onClick={handleLogOut}>Log Out</Nav.Link>
                                :
                                <>
                                <Nav.Link className='navText' style={{color: 'white'}} href="/Login">Log in</Nav.Link>
                                <Nav.Link className='navText' style={{color: 'white'}} href="/Register">Register</Nav.Link>
                                </>
                            }
                        </Nav>
                    </Container>
                        
                </Navbar>
        </div>
    )
}

export default NavBar;