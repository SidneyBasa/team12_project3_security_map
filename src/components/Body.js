import React, { useState } from 'react';
import Map from './pages/Map.tsx';
import Report from './pages/Report.tsx';
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
        //TODO pick a default page to render
        return <Report />;
    };

    return (
        renderPage()
    );
};