import React from 'react';
import MapArea from './pages/MapArea.tsx';
import { AzureMapsProvider } from 'react-azure-maps';

export default function Header() {
    return (
        <AzureMapsProvider>
            <MapArea />
        </AzureMapsProvider>
    );
};