import React from 'react';
import {AzureMap, AzureMapsProvider, IAzureMapOptions} from 'react-azure-maps';
import {AuthenticationType} from 'azure-maps-control';

const at: AuthenticationType = AuthenticationType.subscriptionKey;
const option: IAzureMapOptions = {
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey:process.env.REACT_APP_AZURE_KEY
    }
};

export default function Home() {
    return (
        <div>
            <AzureMapsProvider>
                <div style={{ height: '300px', width: '300px' }}>
                    <AzureMap options={option} />
                </div>
            </AzureMapsProvider>
        </div>
    );
};