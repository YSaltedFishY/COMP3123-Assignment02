import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './css/Employee.css'
import axios from 'axios'

export default class Employee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: []
        }
    }

    getEmployees = async () => {
        const empUrl = "api/v1/emp/employees"
        try {
            const response = await axios.get(empUrl)
            console.log(response.data)

            this.setState({ employees: response.data })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }


    componentDidMount() {
        this.getEmployees()
    }

    


    render() {
        return (
            <div className='container'>
                <h1>Employee List</h1>
                <Link className="add-button" to={`/employees/create`}>Add Employee</Link>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.employees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee.firstname}</td>
                                <td>{employee.lastname}</td>
                                <td>{employee._id}</td>
                                <td>
                                    <div className="actions">
                                        <Link className='action-button view' to={`/employees/${employee._id}`}>View</Link>
                                        <Link className='action-button update' to={`/employees/update/${employee._id}`}>Update</Link>
                                        <Link className='action-button delete'to={`/employees/delete/${employee._id}`}>Delete</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}