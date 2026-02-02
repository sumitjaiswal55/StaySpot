import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [successMsg, setSuccessMsg] = useState("");
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Submit karte hi purana error saaf
        setSuccessMsg(""); // Purana success message bhi saaf

        try {
            const response = await axios.post("http://localhost:8080/api/users/signup", formData);
            
            // Step 1: Data save karo
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            // Step 2: Green Box dikhao
            setSuccessMsg("Signup Successful! Welcome to Wonderlust.");

            // Step 3: 3 second baad redirect
            setTimeout(() => {
                navigate("/listings");
            }, 3000);

        } catch (err) {
            // Agar error aaya toh redirect NAHI hoga, sirf ye red box dikhega
            setError(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div className="row mt-3">
            <div className="col-8 offset-2">
                <form onSubmit={handleSubmit} noValidate className="needs-validation">
                    <h1 className="col-6 offset-2">SignUp on Airbnb</h1>
                    
                    {/* Error Message - Bootstrap Red Box */}
                    {error && (
                        <div className="alert alert-danger text-center" role="alert">
                            {error}
                        </div>
                    )}

                    {/* Success Message - Bootstrap Green Box */}
                    {successMsg && (
                        <div className="alert alert-success text-center" role="alert">
                            {successMsg}
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="name">Full Name</label>
                        <input 
                            type="text" name="name" id="name" 
                            placeholder="Enter your full name" 
                            className="form-control" 
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" name="email" id="email"
                            placeholder="Enter Email" 
                            className="form-control" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" name="password" id="password" 
                            placeholder="Enter your password" 
                            className="form-control" 
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-success w-100">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;