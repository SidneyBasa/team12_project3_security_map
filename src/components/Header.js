import React from 'react';

export default function Header({handlePageChange}) {
    return (
        <div>
            <a href="#map" onClick={() => handlePageChange('Map')}>
                Map
            </a>
            <br></br>
            <a href="#report" onClick={() => handlePageChange('Report')}>
                Report
            </a>
        </div>
    );
};