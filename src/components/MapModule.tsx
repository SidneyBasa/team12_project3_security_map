import React, { useContext, useEffect, useState, useMemo } from 'react';
import {
    AzureMap,
    IAzureMapOptions,
    IAzureMapsContextProps,
    IAzureMapControls,
    AzureMapsContext,
    AzureMapHtmlMarker,
    IAzureMapHtmlMarkerEvent,
    AzureMapDataSourceProvider,
    AzureMapLayerProvider,
    IAzureMapLayerType,
    IAzureDataSourceChildren
} from 'react-azure-maps';
import {AuthenticationType, ControlOptions, CameraOptions, StyleOptions, HtmlMarkerOptions, SymbolLayerOptions, data, source, layer} from 'azure-maps-control';
import IncidentPin from '../classes/IncidentPin.tsx';

//default coords in seattle
const longitude = -122.32945;
const latitude = 47.60357;

const loaded: boolean = false;

const option: IAzureMapOptions = {
    center: [longitude, latitude],
    zoom: 13,
    renderWorldCopies: false,
    showFeedbackLink: false,
	showLogo: false,
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey:process.env.REACT_APP_AZURE_KEY
    }
};

const eventToMarker: Array<IAzureMapHtmlMarkerEvent> = [{ eventName: 'click', callback: markerCallback }];
function azureHtmlMapMarkerOptions(coordinates: data.Position, text: string, title: string): HtmlMarkerOptions {
    return {
        position: coordinates,
        text,
        title,
    };
}
function markerCallback(event) {
    const thisDisp = event.target.element.querySelector('.info-display');
    const selecting = !thisDisp.classList.contains('selected');
    document.querySelectorAll('.info-display').forEach(disp => {
        disp.classList.remove('selected');
    });
    if(selecting) {
        thisDisp.classList.add('selected');
    }
}
function renderHTMLPoint(pin: IncidentPin): any {
    const rendId = Math.random();
    return (
      <AzureMapHtmlMarker
        key={rendId}
        markerContent={
            //HTML MARKER DISPLAYED ON MAP
            pin.getPin()
        }
        options={{ ...azureHtmlMapMarkerOptions(pin.getCoords(), 'Some Text', 'MyTitle') } as any}
        events={eventToMarker}
      />
    );
  }

  const memoizedOptions: SymbolLayerOptions = {
    textOptions: {
      textField: ['get', 'title'], //Specify the property name that contains the text you want to appear with the symbol.
      offset: [0, 1.2],
    },
  };

  export default function Map({mode,htmlMarkers,setCurrentPoint}) {
    const { mapRef, isMapReady } = useContext<IAzureMapsContextProps>(AzureMapsContext);
    const [markersLayer] = useState<IAzureMapLayerType>('SymbolLayer');
    const [layerOptions, setLayerOptions] = useState<SymbolLayerOptions>(memoizedOptions);
    const [myLayer, setMyLayer] = useState<JSX.Element>();

    if(!htmlMarkers) {
        htmlMarkers = [] as IncidentPin[];
    }
    const memoizedHtmlMarkerRender: IAzureDataSourceChildren = useMemo(
      (): any => htmlMarkers.map((marker) => renderHTMLPoint(marker)),
      [htmlMarkers]
    );

    //const [myLayer, setMyLayer] = useState<JSX.Element>();

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

    //load resources when map finished loading
    useEffect(() => {
        if(isMapReady && mapRef) {
            
        }
    }, [isMapReady]);

    mapRef?.events.add('load', e=> {
        if(mapRef.sources.getSources().length === 1) {
            const dataSourceRef = new source.DataSource();
            const layerRef = new layer.SymbolLayer(dataSourceRef);
            mapRef.sources.add(dataSourceRef);
            mapRef.layers.add(layerRef);

            navigator.geolocation.getCurrentPosition(position => {
                const opts: CameraOptions = {
                    center:[position.coords.longitude,position.coords.latitude]
                };
                mapRef.setCamera(opts);
            }, err => {
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        console.log('User denied the request for Geolocation.');
                        break;
                    case err.POSITION_UNAVAILABLE:
                        console.log('Position information is unavailable.');
                        break;
                    case err.TIMEOUT:
                        console.log('The request to get user position timed out.');
                        break;
                    default:
                        console.log('An unknown error occurred retrieving user location.');
                        break;
                }
            });

            if(mode === 'report') {
                mapRef.events.add('click', e=>{
                    if(e.position){
                        //clear last point
                        dataSourceRef.clear();

                        //set a basic point at click position
                        const thisPoint = new data.Point(e.position);
                        setCurrentPoint(thisPoint);
                        dataSourceRef.add(new data.Feature(thisPoint));
                    }
                });
            }
            setMyLayer(
                <AzureMapDataSourceProvider id={'incident-pins-data'}>
                <AzureMapLayerProvider
                    id={'incident-pins-layer'}
                    options={layerOptions}
                    lifecycleEvents={{
                        layeradded: () => {
                            console.log('LAYER ADDED TO MAP');
                        }
                    }}
                    type={markersLayer}
                />
                {memoizedHtmlMarkerRender}
                </AzureMapDataSourceProvider>
            );
        }
    });

    return (
        <div>
            <div style={{ height: '500px', width: '700px' }}>
                <AzureMap options={option} controls={controls} cameraOptions={{} as CameraOptions} styleOptions={{} as StyleOptions}>
                    {myLayer}
                </AzureMap>
            </div>
        </div>
    );
};