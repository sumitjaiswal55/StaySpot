import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const Show = () => {
    const { id } = useParams(); // URL se listing ID nikalne ke liye
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [currUser, setCurrUser] = useState(null);
    const [review, setReview] = useState({ rating: 5, comment: "" });

    useEffect(() => {
        // User info aur Listing data fetch karna
        const user = JSON.parse(localStorage.getItem("user"));
        setCurrUser(user);

        const fetchListing = async () => {
            try {
                const res = await API.get(`/listings/${id}`);
                setListing(res.data);
                // Map setup hum baad mein karenge
            } catch (err) {
                console.error("Error fetching listing:", err);
            }
        };
        fetchListing();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this listing?")) {
            try {
                await API.delete(`/listings/${id}`);
                navigate("/listings");
            } catch (err) {
                alert("Could not delete listing", err);
            }
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post(`/listings/${id}/reviews`, { review });
            window.location.reload(); // Simple refresh to show new review
        } catch (err) {
            alert("Review failed", err);
        }
    };

    if (!listing) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="row mt-3">
            <div className="col-8 offset-3">
                <h3>{listing.title}</h3>
            </div>

            <div className="card col-6 offset-3 show-card listing-card">
                <img src={listing.image.url} className="card-img-top show-img" alt="listing_img" />
                <div className="card-body">
                    <p className="card-text"><i><b>Owned By: </b>{listing.owner.name}</i></p>
                    <p className="card-text">{listing.description}</p>
                    <p className="card-text">&#x20B9; {listing.price?.toLocaleString("en-IN")}</p>
                    <p className="card-text">{listing.location}</p>
                    <p className="card-text">{listing.country}</p>
                </div>
                
                {/* Authorization check */}
                {currUser && currUser.id === listing.owner._id && (
                    <div className="btns mb-3">
                        <button onClick={() => navigate(`/listings/${id}/edit`)} className="btn btn-dark">Edit</button>
                        <button onClick={handleDelete} className="btn btn-dark ms-3">Delete</button>
                    </div>
                )}
            </div>

            <hr />
            <div className="col-8 offset-3 mb-3">
                {currUser && (
                    <>
                        <h4>Leave a Review</h4>
                        <form onSubmit={handleReviewSubmit}>
                            <div className="mb-3 mt-3">
                                <label>Rating</label>
                                <input 
                                    type="range" min="1" max="5" className="form-range" 
                                    onChange={(e) => setReview({...review, rating: e.target.value})}
                                />
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="comment">Comments</label>
                                <textarea 
                                    className="form-control" rows="5" required
                                    onChange={(e) => setReview({...review, comment: e.target.value})}
                                ></textarea>
                            </div>
                            <button className="btn btn-outline-dark">Submit</button>
                        </form>
                    </>
                )}

                <div className="row mt-3">
                    {listing.reviews.length > 0 && <h4>All Reviews</h4>}
                    {listing.reviews.map((rev) => (
                        <div className="cardreviews col-5 mb-3 ms-3 p-3" key={rev._id}>
                            <div className="card-body">
                                <p className="card-title"><b>@{rev.author.name}</b></p>
                                <p className="card-text">Rating: {rev.rating} Stars</p>
                                <p className="card-text">{rev.comment}</p>
                            </div>
                            {currUser && currUser.id === rev.author._id && (
                                <button className="btn btn-sm btn-dark">Delete</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-8 offset-3 mb-3">
                <h3>Where you'll be</h3>
                <div id="map" style={{ height: "400px", background: "#eee" }}>
                    {/* Mapbox will be integrated here */}
                    <p className="text-center p-5">Map Loading...</p>
                </div>
            </div>
        </div>
    );
};

export default Show;