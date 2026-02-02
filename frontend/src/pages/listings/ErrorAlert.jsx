import React from 'react';

const ErrorAlert = ({ message }) => {
    // Agar message nahi hai toh kuch render mat karo
    if (!message) return null;

    return (
        <div className="row mt-3">
            <div className="alert alert-danger col-6 offset-3" role="alert">
                <h4 className="alert-heading">{message}...</h4>
            </div>
        </div>
    );
};

export default ErrorAlert;