import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        window.location.reload(); 
    };

    return (
        <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top py-2">
            <div className="container">
                {/* Brand Logo & Name */}
                <Link className="navbar-brand d-flex align-items-center logo" to="/">
                    <i className="fa-solid fa-earth-americas me-2" style={{fontSize: "1.4rem", color: "#fe424d"}}></i>
                    <span className="fw-bold" style={{letterSpacing: "-0.5px", fontSize: "1.2rem"}}>StaySpot</span>
                </Link>

                {/* Hamburger Button for Mobile */}
                <button 
                    className="navbar-toggler shadow-none border-0" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#staySpotNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="staySpotNav">
                    <div className="navbar-nav ms-auto align-items-center">
                        {!user ? (
                            /* User Login nahi hai toh sirf ye buttons dikhenge */
                            <div className="d-flex">
                                <Link className="btn btn-outline-secondary btn-sm rounded-pill px-3 me-2" to="/signup">SignUp</Link>
                                <Link className="btn btn-color btn-sm rounded-pill px-3" to="/login">LogIn</Link>
                            </div>
                        ) : (
                            /* User Login hai toh sirf Dropdown dikhega */
                            <div className="nav-item dropdown">
                                <button 
                                    className="nav-link dropdown-toggle btn border-0 d-flex align-items-center" 
                                    id="navbarDropdown"
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    <i className="fa-solid fa-circle-user fs-4 me-1"></i>
                                    <span className="fw-500">{user.name}</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2" style={{borderRadius: "12px"}}>
                                    <li><Link className="dropdown-item rounded-2" to="/listings/new">Host your home</Link></li>
                                    <li><Link className="dropdown-item rounded-2" to="/listings">Explore All</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item text-danger rounded-2" onClick={handleLogout}>
                                            <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;