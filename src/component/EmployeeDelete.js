import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './css/EmployeeDetails.css'

export default function EmployeeDelete() {
    const { empId } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    var [emp, setEmp] = useState([])

    const getEmpDetail = async () => {
        const empUrl = `https://comp3123-assignment01.vercel.app/api/v1/emp/employees/${empId}`

        try {
            const response = await axios.get(empUrl)
            setEmp(response.data)
            // console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            setError("Unable to fetch employee details. Please try again later.")
        }
    }


    const deleteEmployee = async () => {
        const deleteUrl = `https://comp3123-assignment01.vercel.app/api/v1/emp/employees?eid=${empId}`;
        try{
            await axios.delete(deleteUrl)
            alert('Employee has been deleted!')
            navigate('/employee')
        }catch (error){
            console.log(error)
            alert(`Failed to delete employee ${empId}. Please try again`)
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
            <h2 className='h2-delete'>DELETING EMPLOYEE ID {emp._id}</h2>
            {error ? ( //When the try catch block catches an error
                <div>
                    <h2>Employee Details</h2>
                    <p className='error-msg'>{error}</p>
                </div>
            ) : emp ? (
                //employee details
                <div className='card'>
                    <h2 className='card-title'>Employee Details:</h2>
                    <p><strong>First Name:</strong> {emp.firstname}</p>
                    <p><strong>Last Name:</strong> {emp.lastname}</p>
                    <p><strong>Email:</strong> {emp.email}</p>
                    <p><strong>Position:</strong> {emp.position}</p>
                    <p><strong>Salary:</strong> ${emp.salary}</p>
                    <p><strong>Department:</strong> {emp.department}</p>
                    <p><strong>Date of Joining:</strong> {new Date(emp.date_of_joining).toLocaleDateString()}</p>

                    <div className='btn-container'>
                        <button className='confirm' onClick={deleteEmployee}>Confirm</button>
                        <button className='cancel' onClick={cancel}>Cancel</button>
                    </div>
                </div>
            ) : (
                //In case employee information is not yet loaded
                <p>Loading employee {empId} details</p>
            )
            }

        </div>
    )
}
