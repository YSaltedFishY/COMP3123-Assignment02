import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useState } from 'react'
import './css/EmployeeDetails.css'

export default function Signup() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        "username": "",
        "password": "",
        "email": "",
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userUrl = `https://comp3123-assignment01.vercel.app/api/v1/user/signup`

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
        navigate('/Login')

    }

    return (
        <div className='container'>
            <h2>Register Form</h2>
            {(
                <form className='update-form' onSubmit={handleSubmit}>
                    <h2 className='card-title'>Create your account</h2>
                    <label>Username:
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            placeholder={"Vercel"}
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
                    <label>Email:
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            placeholder={"Vercel.deploy@example.com"}
                            onChange={handleInput}
                            required />
                    </label>
                    
                    <div className='btn-update'>
                        <button type="submit" className='confirm-update' >Register</button>
                        <button className='cancel-update' onClick={cancel}>Cancel</button>
                    </div>
                </form>
            )}

        </div>
    )
}
