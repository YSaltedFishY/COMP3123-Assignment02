import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useState } from 'react'
import './css/EmployeeDetails.css'

export default function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        "username": "",
        "password": "",
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userUrl = `/api/v1/user/signup`

        try {
            await axios.post(userUrl, user)
            alert('You have registered successfully!');
            navigate(`/employee`)
        } catch (error) {
            console.log(error)
            alert(`Registered failed! please try again later`)
        }
    }

    const cancel = () => {
        navigate('/signup')

    }

    return (
        <div className='container'>
            <h2>Employee Management Login</h2>
            {(
                <form className='update-form' onSubmit={handleSubmit}>
                    <h2 className='card-title'>Login</h2>
                    <label>Username:
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            placeholder={"username"}
                            onChange={handleInput}
                            required />
                    </label>
                    <label>Password:
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            placeholder='password'
                            onChange={handleInput}
                            required />
                    </label>

                    <div className='btn-update'>
                        <button type="submit" className='confirm-update' >Register</button>
                        <button type="button" className='register' onClick={cancel}>Register</button>
                    </div>
                </form>
            )}

        </div>
    )
}
