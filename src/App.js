import logo from './logo.svg';
import './App.css';
import { Routes, Route, BrowserRouter, NavLink, Link, Navigate, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import Employee from './component/Employee';
import Signup from './component/Signup';
import Login from './component/Login';
import EmployeeDetails from './component/EmployeeDetails';
import EmployeeDelete from './component/EmployeeDelete';
import EmployeeUpdate from './component/EmployeeUpdate';
import EmployeeCreate from './component/EmployeeCreate';

export default function App() {
  const [user, setUser] = useState(null)


  useEffect(() => {
    const token = localStorage.getItem('token')
    const username = localStorage.getItem('username')
    if (token && username) {
      setUser(username)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setUser(null);
    alert(`Logged out success!`)
    window.location.href = '/login'

  }





  return (
    <div>
      <BrowserRouter>
        <header className='top-bar'>
          {user ? (<Link to="/employee" className='title'>Employee Management App</Link>)
            : (<Link to="/Login" className='title'>Employee Management App</Link>)}
          <nav className="nav-bar">
            {user ? (
              <span className='auth-links'>
                <NavLink to='/employee'>Employees</NavLink>
                <span>Welcome {user}</span>
                <button className='log-out' onClick={handleLogout}>Log out</button>
              </span>
            ) : (
              <span>
                <span className='auth-links'>
                  <NavLink className='auth-links' to='/Login'>Login</NavLink>
                  <span className="separator">|</span>
                  <NavLink className='auth-links' to='/signup'>Register</NavLink>
                </span>
              </span>
            )}
          </nav>

        </header>

        <Routes>
          {/* if user is not login, redirect homepage to login, if user is login redirect homepage to employee list */}
          {user ? (
            <>
              <Route path='/Login' element={<Employee />}/>
              <Route path='/' element={<Navigate to="/employee" replace />} />
            </>
          ) : (
            <>
              <Route path='/Login' element={<Login onLogin={(username) => {
                setUser(username)
                localStorage.setItem('username', username)
              }} />} />
              <Route path='/' element={<Navigate to="/login" replace />} />
            </>
          )}

          <Route path='/signup' element={<Signup />} />

          {/* if user is not login */}
          {user ? (
            <>
              <Route path='/employee' element={<Employee />} />
              <Route path='/employees/:empId' element={<EmployeeDetails />} />
              <Route path='/employees/update/:empId' element={<EmployeeUpdate />} />
              <Route path='/employees/delete/:empId' element={<EmployeeDelete />} />
              <Route path='/employees/create' element={<EmployeeCreate />} />
            </>) : (
            <>
              <Route path='/employee' element={<Login />} />
              <Route path='/employees/:empId' element={<Login />} />
              <Route path='/employees/update/:empId' element={<Login />} />
              <Route path='/employees/delete/:empId' element={<Login />} />
              <Route path='/employees/create' element={<Login />} />
            </>
          )}

        </Routes>
      </BrowserRouter>
    </div>
  )

}
