import React, { useEffect, useState } from 'react';
import API from '../../api/axios';
import { Link } from 'react-router-dom';

const AllListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    // 1. Tax toggle state
    const [showTax, setShowTax] = useState(false);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await API.get("/listings");
                setListings(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Data fetch error:", err);
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    if (loading) return <div className="text-center mt-5"><h3>Loading Wonders...</h3></div>;

    return (
        <div>
            {/* 2. Filters & Tax Toggle Section */}
            <div id="filters" className="d-flex align-items-center flex-wrap">
                <div className="filter"><i className="fa-solid fa-fire"></i><p>Trending</p></div>
                <div className="filter"><i className="fa-solid fa-bed"></i><p>Rooms</p></div>
                <div className="filter"><i className="fa-solid fa-mountain-city"></i><p>Iconic Cities</p></div>
                <div className="filter"><i className="fa-solid fa-mountain"></i><p>Mountain</p></div>
                <div className="filter"><i className="fa-solid fa-person-swimming"></i><p>Pool</p></div>
                <div className="filter"><i className="fa-solid fa-cow"></i><p>Farms</p></div>
                <div className="filter"><i className="fa-solid fa-snowflake"></i><p>Snow</p></div>
                <div className="filter"><i className="fa-solid fa-igloo"></i><p>Igloo</p></div>
                <div className="filter"><i className="fa-solid fa-umbrella-beach"></i><p>Beach</p></div>
                <div className="filter"><i className="fa-solid fa-house-signal"></i><p>Villa</p></div>

                <div className="tax-toggle ms-auto">
                    <div className="form-check-reverse form-switch">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            role="switch" 
                            id="flexSwitchCheckDefault"
                            onChange={() => setShowTax(!showTax)} // Toggle state logic
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Display total after taxes</label>
                    </div>
                </div>
            </div>

            {/* 3. Listings Grid */}
            <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-3">
                {listings.map((item) => (
                    <Link to={`/listings/${item._id}`} className="listing-link" key={item._id}>
                        <div className="card listing-card">
                            <img 
                                src={item.image?.url || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60"} 
                                className="card-img-top" 
                                alt="listing" 
                                style={{ height: "20rem" }}
                            />
                            <div className="card-img-overlay"></div>
                            <div className="card-body">
                                <p className="card-text">
                                    <b>{item.title}</b> <br />
                                    ₹{item.price?.toLocaleString("en-IN")} / night
                                    {/* 4. Conditional GST Display */}
                                    {showTax && <i className="text-muted"> &nbsp; +18% GST</i>}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllListings;