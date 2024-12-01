import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './css/EmployeeDetails.css'

export default function EmployeeDetails() {
  const { empId } = useParams()
  const [error, setError] = useState(null)
  var [emp, setEmp] = useState([])

  const getEmpDetail = async () => {
    const empUrl = `/api/v1/emp/employees/${empId}`

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

  useEffect(() => {
    getEmpDetail()
    return () => {

    }
  }, [])

  return (
    <div className='container'>
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
          <p><strong>Created at:</strong> {new Date(emp.created_at).toLocaleDateString()}</p>
          <p><strong>Updated at:</strong> {new Date(emp.updated_at).toLocaleDateString()}</p>
        </div>
      ) : (
        //In case employee information is not yet loaded
        <p>Loading employee {empId} details</p>
      )
      }

    </div>
  )
}
