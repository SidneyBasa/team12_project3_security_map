import React, { useContext, useEffect, useState, useMemo } from 'react';
import {
    AzureMapHtmlMarker,
    IAzureMapHtmlMarkerEvent
} from 'react-azure-maps';
import {HtmlMarkerOptions, SymbolLayerOptions, data} from 'azure-maps-control';
import MapModule from '../MapModule.tsx';

//presumably fetch user data and set coords to their home location
const longitude = -122.32945;
const latitude = 47.60357;

//globals that aren't state to get around unresolved event handler state scope issues
let htmlMarkersGlobal: data.Position[] = [new data.Position(longitude, latitude)];

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

  export default function Map() {
    // const [htmlMarkers, setHtmlMarkers] = useState(htmlMarkersGlobal);
    // const [layerOptions, setLayerOptions] = useState<SymbolLayerOptions>(memoizedOptions);

    // const memoizedHtmlMarkerRender: IAzureDataSourceChildren = useMemo(
    //   (): any => htmlMarkers.map((marker) => renderHTMLPoint(marker)),
    //   [htmlMarkers]
    // );

    return (
        <div>
            <MapModule mode={'map'} />
        </div>
    );
};