import React from 'react';

export default function Header({handlePageChange}) {
    return (
        <div className='headerDiv'>
            <a href="#map" onClick={() => handlePageChange('Map')}>
                Map
            </a>
            <br></br>
            <a href="#report" onClick={() => handlePageChange('Report')}>
                Report
            </a>
            <br></br>
            <a href="#login" onClick={() => handlePageChange('Login')}>
                Log In
            </a>
            <br></br>
            <a href="#signup" onClick={() => handlePageChange('Signup')}>
                Sign Up
            </a>
        </div>
    );
};