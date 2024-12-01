import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './css/EmployeeDetails.css'

export default function EmployeeCreate() {
    const navigate = useNavigate()
    const [emp, setEmp] = useState([])
    const [employee, setEmployee] = useState({
        "firstname": "",
        "lastname": "",
        "email": "",
        "position": "",
        "salary": '',
        "date_of_joining": '',
        "department": ""
    })

    const handleInput = (e) => {
        const { name, value } = e.target
        setEmployee((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const empUrl = `https://comp3123-assignment01.vercel.app/api/v1/emp/employees`

        const currentDate = new Date().toISOString();
        const empCreateData = {...employee, date_of_joining: currentDate}

        try {
            await axios.post(empUrl, empCreateData)
            alert('Employee created successfully!');
            navigate(`/employee`)
        } catch (error) {
            console.log(error)
            alert(`Employee creation failed. Please try again later`)
        }
    }

    const cancel = () => {
        navigate('/employee')

    }


    useEffect(() => {
        
        return () => {

        }
    }, [])



    return (
        <div className='container'>
            <h2>Creation Form</h2>
            {(
                <form className='update-form' onSubmit={handleSubmit}>
                    <h2 className='card-title'>Add new employee</h2>
                    <label>First Name:
                        <input
                            type="text"
                            name="firstname"
                            value={employee.firstname}
                            placeholder={"Vercel"}
                            onChange={handleInput}
                            required />
                    </label>
                    <label>Last Name:
                        <input
                            type="text"
                            name="lastname"
                            value={employee.lastname}
                            placeholder={"Fish"}
                            onChange={handleInput}
                            required />
                    </label>
                    <label>Email:
                        <input
                            type="email"
                            name="email"
                            value={employee.email}
                            placeholder={"Vercel.deploy@example.com"}
                            onChange={handleInput}
                            required />
                    </label>
                    <label>Position:
                        <input
                            type="text"
                            name="position"
                            value={employee.position}
                            placeholder={"Deployment"}
                            onChange={handleInput}
                            required />
                    </label>
                    <label>Salary:
                        <input
                            type="number"
                            name="salary"
                            value={employee.salary}
                            placeholder={"90000"}
                            onChange={handleInput}
                            required />
                    </label>
                    <label>Department:
                        <input
                            type="text"
                            name="department"
                            value={employee.department}
                            placeholder={"External"}
                            onChange={handleInput}
                            required />
                    </label>

                    <div className='btn-update'>
                        <button type="submit" className='confirm-update' >Confirm</button>
                        <button className='cancel-update' onClick={cancel}>Cancel</button>
                    </div>
                </form>
            )}

        </div>
    )
}
