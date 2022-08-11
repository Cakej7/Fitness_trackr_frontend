import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RegisterUser = ({ setToken }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword]= useState("")
    const [passConfirm, setPassConfirm]= useState("")
    let navigate = useNavigate()

    const RegisterFetch = async (e) => {
        e.preventDefault()

        if (password.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be at least 8 characters.'
              })
        } else {
            try {
                const response = await fetch('https://fitnesstrac-kr.herokuapp.com/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    }),
                })
                const { token } = await response.json()
                // console.log(token)
                localStorage.setItem('JWT', token)
        
                if (token) {
                    setToken(token)
                }
    
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'New user created! Welcome!',
                    showConfirmButton: false,
                    timer: 2000
                  })
    
                navigate('../')
    
            } catch (err) {
                console.error(err)
            }
        }

        
    }

    const handleUserSet = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordSet = (e) => {
        setPassword(e.target.value)
    }

    const handlePassConfirm = (e) => {
        setPassConfirm(e.target.value)
    }

    const handlePasswordError = (e) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Passwords do not match!',
          })
    }
 

    return (
    //   <div>
    //     <h1>Sign Up Here</h1>
    //     <form onSubmit={RegisterFetch}>
    //         <label>Username: </label>
    //         <input type="text" placeholder="Username" value={username} onChange={handleUserSet}/>

    //         <label>Password: </label>
    //         <input type="password" placeholder="Password" value={password}
    //          onChange={handlePasswordSet}/>

    //         <button>Register</button>  
    //     </form>
    //   </div>    
    <Form onSubmit={RegisterFetch}>
        <h1>Register Here</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Create Username" value={username} onChange={handleUserSet} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Create password" value={password} onChange={handlePasswordSet}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm password" value={passConfirm} onChange={handlePassConfirm}/>
      </Form.Group>

      {password === passConfirm ? 
        <Button variant="primary" type="submit">
            Submit
        </Button>
            :
        <Button variant="contained" onClick={handlePasswordError}>
            Submit
        </Button>
          }

      
    </Form>
    )
};

export default RegisterUser;