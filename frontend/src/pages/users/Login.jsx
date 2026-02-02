import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState(""); // Success state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post("http://localhost:8080/api/users/login", formData);
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user)); 

            // Green box show karo
            setSuccessMsg("Login Successful! Redirecting...");

            // 3 second baad redirect karo
            setTimeout(() => {
                navigate("/listings");
            }, 3000);

        } catch (err) {
            setError(err.response?.data?.error || "Invalid Email or Password");
        }
    };

    return (
        <div className="row mt-3">
            <div className="col-8 offset-2">
                {/* Green Alert Box for Success */}
                {successMsg && (
                    <div className="alert alert-success mt-2 text-center" role="alert">
                        {successMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="needs-validation">
                    <h1 className="col-6 offset-2">Login on Airbnb</h1>
                    
                    {error && <p style={{ color: '#fe424d', textAlign: 'center' }}>{error}...</p>}

                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btn btn-success">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;