import React from 'react';
import Home from './pages/Home.tsx';
import { AzureMapsProvider } from 'react-azure-maps';

export default function Header() {
    return (
        <AzureMapsProvider>
            <Home />
        </AzureMapsProvider>
    );
};