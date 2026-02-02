import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const EditListing = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // State for listing data
    const [listing, setListing] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        country: ''
    });
    const [image, setImage] = useState(null); // New image file
    const [previewImg, setPreviewImg] = useState(""); // Old image preview
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Purana data fetch karna
        const fetchListing = async () => {
            try {
                const res = await API.get(`/listings/${id}`);
                const data = res.data;
                setListing({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    location: data.location,
                    country: data.country
                });
                // Image preview ke liye backend se bhej rahe hain
                setPreviewImg(data.image?.url?.replace("/upload", "/upload/h_250,w_250"));
                setLoading(false);
            } catch (err) {
                console.error("Error fetching listing:", err);
                navigate("/listings");
            }
        };
        fetchListing();
    }, [id, navigate]);

    const handleChange = (e) => {
        setListing({ ...listing, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Multipart data ke liye FormData zaroori hai
        const data = new FormData();
        data.append("title", listing.title);
        data.append("description", listing.description);
        data.append("price", listing.price);
        data.append("location", listing.location);
        data.append("country", listing.country);
        if (image) data.append("image", image);

        try {
            await API.put(`/listings/${id}`, data); // Backend PUT route
            alert("Listing Updated!");
            navigate(`/listings/${id}`);
        } catch (err) {
            alert("Update failed!", err);
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="row mt-3">
            <div className="col-8 offset-2">
                <h2>Update Listing</h2>
                <form onSubmit={handleSubmit} noValidate className="needs-validation">
                    <div className="mb-3">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" value={listing.title} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" value={listing.description} onChange={handleChange} className="form-control" required></textarea>
                    </div>

                    <div className="mb-3">
                        <p>Original Image Preview:</p>
                        <img src={previewImg} alt="Original" className="img-thumbnail" style={{ height: "150px" }} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image">Upload New Image</label>
                        <input type="file" name="image" onChange={handleFileChange} className="form-control" />
                    </div>

                    <div className="row">
                        <div className="mb-3 col-md-4">
                            <label htmlFor="price">Price</label>
                            <input type="number" name="price" value={listing.price} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="mb-3 col-md-8">
                            <label htmlFor="country">Country</label>
                            <input type="text" name="country" value={listing.country} onChange={handleChange} className="form-control" required />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="location">Location</label>
                        <input type="text" name="location" value={listing.location} onChange={handleChange} className="form-control" required />
                    </div>

                    <button type="submit" className="btn btn-dark btn-color mb-5">Update Listing</button>
                </form>
            </div>
        </div>
    );
};

export default EditListing;