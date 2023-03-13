import React, { useState } from 'react';
import { Login, Map, Signup, Report } from './pages';
import { AzureMapsProvider } from 'react-azure-maps';

export default function Body({currentPage}) {
    const renderPage = () => {
        if (currentPage === 'Map') {
          return (
            <AzureMapsProvider>
                <Map />
            </AzureMapsProvider>
          );
        }
        if (currentPage === 'Report') {
          return (
            <AzureMapsProvider>
                <Report />
            </AzureMapsProvider>
          );
        }
        if( currentPage === 'Login') {
            return <Login />;
        }
        if (currentPage === 'Signup') {
            return <Signup />;
        }
        //TODO pick a default page to render
        return <Login />;
    };

    return (
        renderPage()
    );
};