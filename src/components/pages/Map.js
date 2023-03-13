import React, { useContext, useEffect, useState, useMemo } from 'react';
import {HtmlMarkerOptions, SymbolLayerOptions, data} from 'azure-maps-control';
import MapModule from '../MapModule.tsx';
import IncidentPin from '../../classes/IncidentPin.js';

//presumably fetch user data and set coords to their home location
const longitude = -122.32945;
const latitude = 47.60357;

//TEST DATA TO BE IMPORTED
const ip1 = new IncidentPin(new data.Position(-80.45,40.79), "Thing Happened", "", "Suspectus Maximus", "2023-03-12T11:17", "2023-03-12 12:31:26", "Jessica", "msn.com");
const ip2 = new IncidentPin(new data.Position(-80.5,40.74), "Some Stuff Occurred", "This is a description of the stuff that occurred. It was a big to-do.", "", "2023-03-11T17:17", "2023-03-11 19:23:01", "Jerry", "google.com");
const ip3 = new IncidentPin(new data.Position(-80.55,40.7), "Bad Things", "Not so good stuff went on here.", "Unknown Assailant", "2022-11-09T01:17", "2022-11-09 12:23:01", "John", "bing.com");

//globals that aren't state to get around unresolved event handler state scope issues
let htmlMarkersGlobal = [
  ip1,
  ip2,
  ip3
];

  export default function Map() {
    const [htmlMarkers, setHtmlMarkers] = useState(htmlMarkersGlobal);

    return (
        <div className='mapDiv'>
            <MapModule mode={'map'} htmlMarkers={htmlMarkers} />
        </div>
    );
};