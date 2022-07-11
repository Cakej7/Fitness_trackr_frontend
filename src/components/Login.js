import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginUser = ({ setToken }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword]= useState("")
    let navigate = useNavigate()

    const loginFetch = async (e) => {
        e.preventDefault()
            try {
                const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/users/login`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
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
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Login Successfull',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    navigate('../MyRoutines')
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Incorrect username or password'
                      })
                }

            } catch (err) {
                console.error(err)
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
        <h1>Login Here</h1>
        <form onSubmit={loginFetch}>
            <label>Username: </label>
            <input type="text" placeholder="Username" value={username} onChange={handleUserSet}/>

            <label>Password: </label>
            <input type="password" placeholder="Password" value={password}
             onChange={handlePasswordSet}/>

            <button>Login</button>  
        </form>
      </div>    
    )
};


export default LoginUser;