import React, { useContext, useEffect, useState } from 'react';
import {AzureMap, IAzureMapOptions, IAzureMapsContextProps, IAzureMapControls, AzureMapsContext} from 'react-azure-maps';
import {AuthenticationType, ControlOptions, data, layer, source, control} from 'azure-maps-control';

const dataSourceRef = new source.DataSource();
const layerRef = new layer.SymbolLayer(dataSourceRef);

//presumably fetch user data and set coords to their home location
const longitude = -80.42;
const latitude = 40.77;

const option: IAzureMapOptions = {
    center: [longitude, latitude],
    zoom: 14,
    renderWorldCopies: false,
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey:process.env.REACT_APP_AZURE_KEY
    }
};

export default function Home() {
    const { mapRef, isMapReady } = useContext<IAzureMapsContextProps>(AzureMapsContext);

    //load resources when map finished loading
    useEffect(() => {
        if (isMapReady && mapRef) {
          // Need to add source and layer to map on init and ready
          mapRef.sources.add(dataSourceRef);
          mapRef.layers.add(layerRef);

          mapRef.events.add('click', e=>{
            if(e.position){
                const newPoint = new data.Position(e.position[0], e.position[1]);
                dataSourceRef.add(new data.Feature(new data.Point(newPoint)));
            }
          });

        // geolocation control if possible to connect with react-azure-maps
        //   mapRef.controls.add([
        //         new control.GeolocationControl()
        //     ], {
        //         position: 'top-right'
        //     });
        }
      }, [isMapReady]);

    const controls: IAzureMapControls[] = [
        {
            controlName: 'ZoomControl',
            controlOptions: { mapStyles: 'all' },
            options: { position: 'top-right' } as ControlOptions
        },
        {
            controlName: 'PitchControl',
            controlOptions: { pitchDegreesDelta: 5, style: 'dark' },
            options: { position: 'bottom-right' } as ControlOptions,
        }
    ];

    return (
        <div>
            <div style={{ height: '500px', width: '700px' }}>
                <AzureMap options={option} controls={controls} />
            </div>
        </div>
    );
};