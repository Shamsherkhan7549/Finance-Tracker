
import React, { useEffect, useContext, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'


const Navbar = () => {

    return (
        <>

            <div className='d-flex justify-content-between align-items-center py-2 px-4 shadow-sm bg-white sticky-top'>
                <Link className="navbar-brand" to="/"> <img className='logo-image' src="/finance_tracker_logo.svg" alt="" /> <span className='fw-bold px-2'>Dashboard</span></Link>
            </div>

        </>
    )
}

export default Navbar