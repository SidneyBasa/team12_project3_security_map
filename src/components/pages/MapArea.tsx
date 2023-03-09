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
import {AuthenticationType, ControlOptions, HtmlMarkerOptions, SymbolLayerOptions, data, layer, source} from 'azure-maps-control';

const dataSourceRef = new source.DataSource();
const layerRef = new layer.SymbolLayer(dataSourceRef);

//presumably fetch user data and set coords to their home location
const longitude = -122.32945;
const latitude = 47.60357;

//globals that aren't state to get around unresolved event handler state scope issues
let htmlMarkersGlobal: data.Position[] = [];

const option: IAzureMapOptions = {
    center: [longitude, latitude],
    zoom: 13,
    renderWorldCopies: false,
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey:process.env.REACT_APP_AZURE_KEY
    }
};

const eventToMarker: Array<IAzureMapHtmlMarkerEvent> = [{ eventName: 'click', callback: onclick }];
function azureHtmlMapMarkerOptions(coordinates: data.Position, text: string, title: string): HtmlMarkerOptions {
    return {
        position: coordinates,
        text,
        title,
    };
}
function renderHTMLPoint(coordinates: data.Position): any {
    const rendId = Math.random();
    return (
      <AzureMapHtmlMarker
        key={rendId}
        markerContent={<div className="pulseIcon">hey</div>}
        options={{ ...azureHtmlMapMarkerOptions(coordinates, 'Some Text', 'MyTitle') } as any}
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

export default function Home() {
    const { mapRef, isMapReady } = useContext<IAzureMapsContextProps>(AzureMapsContext);
    const [htmlMarkers, setHtmlMarkers] = useState([] as data.Position[]);
    const [markersLayer] = useState<IAzureMapLayerType>('SymbolLayer');
    const [layerOptions, setLayerOptions] = useState<SymbolLayerOptions>(memoizedOptions);

    const memoizedHtmlMarkerRender: IAzureDataSourceChildren = useMemo(
        (): any => htmlMarkers.map((marker) => renderHTMLPoint(marker)),
        [htmlMarkers]
      );

    //load resources when map finished loading
    useEffect(() => {
        if (isMapReady && mapRef) {
          // Need to add source and layer to map on init and ready
          mapRef.sources.add(dataSourceRef);
          mapRef.layers.add(layerRef);

          mapRef.events.add('click', e=>{
            if(e.position){
                //set a basic point at click position
                //dataSourceRef.add(new data.Feature(new data.Point(e.position)));

                //set html marker at click position
                htmlMarkersGlobal = [...htmlMarkersGlobal,e.position];
                setHtmlMarkers(htmlMarkersGlobal);
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
            <p>{`Markers HTML on map: ${htmlMarkers.length}`}</p>
            <div style={{ height: '500px', width: '700px' }}>
                <AzureMap options={option} controls={controls}>
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
                </AzureMap>
            </div>
        </div>
    );
};