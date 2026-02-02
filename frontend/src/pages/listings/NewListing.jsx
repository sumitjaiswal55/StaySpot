import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const NewListing = () => {
    const navigate = useNavigate();
    
    // 1. Initial State for the form
    const [listing, setListing] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        country: ''
    });
    const [image, setImage] = useState(null);

    // 2. Handle text inputs
    const handleChange = (e) => {
        setListing({ ...listing, [e.target.name]: e.target.value });
    };

    // 3. Handle file input (Image)
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    // 4. Submit form data to Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Multipart data (file upload) ke liye FormData use karna zaroori hai
        const data = new FormData();
        data.append("title", listing.title);
        data.append("description", listing.description);
        data.append("price", listing.price);
        data.append("location", listing.location);
        data.append("country", listing.country);
        if (image) data.append("image", image);

        try {
            // POST /api/listings
            const response = await API.post("/listings", data);
            alert("New Listing Created!");
            navigate(`/listings/${response.data._id || ""}`); // Nayi listing par redirect
        } catch (err) {
            console.error("Creation failed:", err);
            alert(err.response?.data?.error || "Could not create listing. Ensure you are logged in.");
        }
    };

    return (
        <div className="row mt-3">
            <div className="col-8 offset-2">
                <br /> <br />
                <h2>Add New Listing</h2>
                <form onSubmit={handleSubmit} noValidate className="needs-validation">
                    
                    <div className="mb-3">
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text" name="title" placeholder="Enter catchy title" 
                            className="form-control" onChange={handleChange} required 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            name="description" placeholder="Enter description" 
                            className="form-control" onChange={handleChange} required 
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image">Upload Image</label>
                        <input 
                            type="file" name="image" 
                            className="form-control" onChange={handleFileChange} 
                        />
                    </div>

                    <div className="row">
                        <div className="mb-3 col-md-4">
                            <label htmlFor="price">Price</label>
                            <input 
                                type="number" name="price" placeholder="Enter price" 
                                className="form-control" onChange={handleChange} required 
                            />
                        </div>

                        <div className="mb-3 col-md-8">
                            <label htmlFor="country">Country</label>
                            <input 
                                type="text" name="country" placeholder="Enter country" 
                                className="form-control" onChange={handleChange} required 
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="location">Location</label>
                        <input 
                            type="text" name="location" placeholder="Enter location" 
                            className="form-control" onChange={handleChange} required 
                        />
                    </div>

                    <button type="submit" className="btn btn-dark new-btn mb-5">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default NewListing;