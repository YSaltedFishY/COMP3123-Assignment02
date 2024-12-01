import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './css/EmployeeDetails.css'

export default function EmployeeUpdate() {
    const { empId } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [emp, setEmp] = useState([])
    const [employee, setEmployee] = useState({
        "firstname": "",
        "lastname": "",
        "email": "",
        "position": "",
        "salary": '',
        "department": "",
        "updated_at": ""
    })


    const getEmpDetail = async () => {
        const empUrl = `/api/v1/emp/employees/${empId}`

        try {
            const response = await axios.get(empUrl)
            setEmp(response.data)
            // console.log(response.data)
            setEmployee({
                "firstname": response.data.firstname,
                "lastname": response.data.lastname,
                "email": response.data.email,
                "position": response.data.position,
                "salary": response.data.salary,
                "department": response.data.department
            })
            return response.data
        } catch (error) {
            console.log(error)
            setError("Unable to fetch employee details. Please try again later.")
        }
    }

    const handleInput = (e) => {
        const { name, value } = e.target
        setEmployee((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const empUpdateUrl = `/api/v1/emp/employees/${empId}`

        const currentDate = new Date().toISOString();
        const empUpdateData = {...employee, updated_at: currentDate}

        try {
            await axios.put(empUpdateUrl, empUpdateData)
            alert('Employee updated successfully!');
            navigate(`/employees/${emp._id}`)
        } catch (error) {
            console.log(error)
            alert(`Employee ID ${emp._id} update failed. Please try again later`)
        }
    }

    const cancel = () => {
        navigate('/employee')

    }

    useEffect(() => {
        getEmpDetail()
        return () => {

        }
    }, [])



    return (
        <div className='container'>
            <h2>Updating Employee {emp.firstname} {emp.lastname}</h2>
            {error ? (
                <p className="error-msg">{error}</p>
            ) : (
                <form className='update-form' onSubmit={handleSubmit}>
                    <h2 className='card-title'>Update Employee</h2>
                    <label>First Name:
                        <input
                            type="text"
                            name="firstname"
                            value={employee.firstname}
                            placeholder={emp.firstname}
                            onChange={handleInput}
                            required />
                    </label>
                    <label>Last Name:
                        <input
                            type="text"
                            name="lastname"
                            value={employee.lastname}
                            placeholder={emp.lastname}
                            onChange={handleInput}
                            required />
                    </label>
                    <label>Email:
                        <input
                            type="email"
                            name="email"
                            value={employee.email}
                            placeholder={emp.email}
                            onChange={handleInput}
                            required />
                    </label>
                    <label>Position:
                        <input
                            type="text"
                            name="position"
                            value={employee.position}
                            placeholder={emp.position}
                            onChange={handleInput}
                            required />
                    </label>
                    <label>Salary:
                        <input
                            type="number"
                            name="salary"
                            value={employee.salary}
                            placeholder={emp.salary}
                            onChange={handleInput}
                            required />
                    </label>
                    <label>Department:
                        <input
                            type="text"
                            name="department"
                            value={employee.department}
                            placeholder={emp.department}
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
