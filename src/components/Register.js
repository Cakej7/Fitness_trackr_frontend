import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterUser = ({ setToken }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword]= useState("")
    let navigate = useNavigate()

    const RegisterFetch = async (e) => {
        e.preventDefault()

        if (password.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be at least 8 characters.',
                footer: '<a href="">Why do I have this issue?</a>'
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
                console.log(token)
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
 

    return (
      <div>
        <h1>Sign Up Here</h1>
        <form onSubmit={RegisterFetch}>
            <label>Username: </label>
            <input type="text" placeholder="Username" value={username} onChange={handleUserSet}/>

            <label>Password: </label>
            <input type="password" placeholder="Password" value={password}
             onChange={handlePasswordSet}/>

            <button>Register</button>  
        </form>
      </div>    
    )
};

export default RegisterUser;