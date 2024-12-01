import React from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api'
import {useState } from 'react'
import './css/EmployeeDetails.css'

export default function Login({onLogin}) {
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
        const userUrl = `https://comp3123-assignment01.vercel.app/api/v1/user/login`

        try {
            const response = await api.post(userUrl, user)

            localStorage.setItem('token', response.data.token)

            onLogin(user.username)

            alert('Login success!');
            navigate(`/employee`)
        } catch (error) {
            console.log(error)
            alert(`Login failed! please try again later ${error.response.data.message}`)
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
                        <button type="submit" className='confirm-update' >Login</button>
                        <button type="button" className='register' onClick={cancel}>Register</button>
                    </div>
                </form>
            )}

        </div>
    )
}
