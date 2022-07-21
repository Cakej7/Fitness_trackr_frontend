import React from 'react';
import { Link } from 'react-router-dom';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Container from 'react-bootstrap/Container';

const NavBar = ({ token }) => {

    const handleLogOut = (cb) => {
        localStorage.removeItem("JWT");
        cb()
    };

    return (
        <div>
            <div id='nav'>
                <Link to="/">
                   <button>Home</button>
                </Link>

                {!token ?
                    null
                    :
                    <Link to="/MyRoutines">
                        <button>My Routines</button>
                    </Link>
                }

                <Link to="/Routines">
                    <button>Public Routines</button>
                </Link>

                <Link to="/Activities">
                    <button>Activities</button>
                </Link>

                {!token ?
                <>
                    <Link to="/Login">
                        <button>Login</button>
                    </Link>

                    <Link to="/Register">
                        <button>Register</button>
                    </Link>
                 </>
                    :
                    <Link to="/"onClick={handleLogOut}>
                        <button>Log Out</button>
                    </Link>
                    
                }
            </ div>
        </div>
        // <div>
        // <Navbar bg="primary" variant="dark">
        //     <Container >
        //         <Navbar.Brand href="/"></Navbar.Brand>
        //         <Nav className="me-auto">
        //             <Nav.Link href="/">Home</Nav.Link>
        //             <Nav.Link href="/Activities">Activities</Nav.Link>
        //             <Nav.Link href="/Routines">Public Routines</Nav.Link>
        //             {token ?
        //                 <Nav.Link href="/MyRoutines">My Routines</Nav.Link>
        //                 :
        //                 null
        //             }
        //             {token ?
        //                 <Nav.Link href="/"onClick={handleLogOut}>Log Out</Nav.Link>
        //                 :
        //                 <>
        //                 <Nav.Link href="/Login">Log in</Nav.Link>
        //                 <Nav.Link href="/Register">Register</Nav.Link>
        //                 </>
        //             }
                    
        //         </Nav>
        //     </Container>
        // </Navbar>
        // </div>
    )
}

export default NavBar;