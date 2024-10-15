import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg  navback" style={{ backgroundColor: ' #007AFF' }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link className="navbar-brand mt-2 mt-lg-0" to="/">
                            <img
                                src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
                                height={20}
                                alt="MDB Logo"
                                loading="lazy"
                            />
                        </Link>
                        {/* Left links */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Inventory Management System
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* Right elements */}
                    <div className="">
                        <Link className="nav-link me-5" to='/tableData'>Uploaded data</Link>
                    </div>
                    <div className="">
                        <Link className="nav-link ms-4" to='/'>Home</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
