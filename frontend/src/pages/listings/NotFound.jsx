// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="row mt-5">
        <div className="col-6 offset-3 text-center">
            <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">404: Page Not Found!</h4>
                <p>Opps! Lagta hai aap galat raste par aa gaye hain.</p>
                <hr />
                <Link to="/" className="btn btn-dark btn-color">Go Back to Home</Link>
            </div>
        </div>
    </div>
);

export default NotFound;