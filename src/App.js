import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter, NavLink, Link } from 'react-router-dom'
import { Component } from 'react';
import Employee from './component/Employee';
import Signup from './component/Signup';
import Login from './component/Login';
import EmployeeDetails from './component/EmployeeDetails';
import EmployeeDelete from './component/EmployeeDelete';
import EmployeeUpdate from './component/EmployeeUpdate';
import EmployeeCreate from './component/EmployeeCreate';

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <header className='top-bar'>
            <Link to="/" className='title'>Employee Management App</Link>
            <nav className="nav-bar">
              <NavLink to='/employee'>Employees</NavLink>
              <span className='auth-links'>
                <NavLink className='auth-links' to='/Login'>Login</NavLink>
                <span className="separator">|</span>
                <NavLink className='auth-links' to='/signup'>Register</NavLink>
              </span>
            </nav>

          </header>
          
          <Routes>
            {/* <Route path="/" element={
              <div>
                <h1>Assignment02 Homepage</h1>
              </div>
            }/> */}

            <Route path='/employee' element={<Employee />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/employees/:empId' element={<EmployeeDetails/>}/>
            <Route path='/employees/update/:empId' element={<EmployeeUpdate/>}/>
            <Route path='/employees/delete/:empId' element={<EmployeeDelete/>}/>
            <Route path='/employees/create' element={<EmployeeCreate/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
