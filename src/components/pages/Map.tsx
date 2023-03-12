import React, { useContext, useEffect, useState, useMemo } from 'react';
import {
    AzureMapHtmlMarker,
    IAzureMapHtmlMarkerEvent,
    IAzureDataSourceChildren
} from 'react-azure-maps';
import {HtmlMarkerOptions, SymbolLayerOptions, data} from 'azure-maps-control';
import MapModule from '../MapModule.tsx';
import IncidentPin from '../../classes/IncidentPin.tsx';

//presumably fetch user data and set coords to their home location
const longitude = -122.32945;
const latitude = 47.60357;

//TEST DATA TO BE IMPORTED
const ip1 = new IncidentPin(new data.Position(-80.45,40.79), "Thing Happened", "", "Suspectus Maximus", "2023-03-12T11:17", "2023-03-12 12:31:26", "Jessica", "msn.com");
const ip2 = new IncidentPin(new data.Position(-80.5,40.74), "Some Stuff Occurred", "This is a description of the stuff that occurred. It was a big to-do.", "", "2023-03-11T17:17", "2023-03-11 19:23:01", "Jerry", "google.com");
const ip3 = new IncidentPin(new data.Position(-80.55,40.7), "Bad Things", "Not so good stuff went on here.", "Unknown Assailant", "2022-11-09T01:17", "2022-11-09 12:23:01", "John", "bing.com");

//globals that aren't state to get around unresolved event handler state scope issues
let htmlMarkersGlobal: IncidentPin[] = [
  ip1,
  ip2,
  ip3
];

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
    const [htmlMarkers, setHtmlMarkers] = useState(htmlMarkersGlobal);

    return (
        <div>
            <MapModule mode={'map'} htmlMarkers={htmlMarkers} />
        </div>
    );
};