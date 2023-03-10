import React, { useState } from 'react';
import { data } from 'azure-maps-control';
import MapModule from '../MapModule.tsx';

export default function Report() {
    const [currentPoint, setCurrentPoint] = useState<data.Point>();

    const handleSubmit = (e) => {
        e.preventDefault();
        const errMsg = document.querySelector("#formErrorMessage");
        
        //validate input before sending to server
        if(!currentPoint) {
            if(errMsg) { errMsg.textContent = 'No location pinned.'; }
            return;
        } else if(!e.target[0].value) {
            if(errMsg) { errMsg.textContent = 'Select an incident time.'; }
            return;
        } else if(!e.target[1].value) {
            if(errMsg) { errMsg.textContent = 'Select a report time.'; }
            return;
        } else if(!e.target[2].value) {
            if(errMsg) { errMsg.textContent = 'Enter a report title.'; }
            return;
        } else if(!e.target[3].value) {
            if(errMsg) { errMsg.textContent = 'Provide a description of the incident.'; }
            return;
        }

        //package the input for shipping to server
        const reqBody = {
            locationX:currentPoint.coordinates[0],
            locationY:currentPoint.coordinates[1],
            title:e.target[2].value,
            description:e.target[3].value,
            incidentTime:e.target[0].value,
            reportTime:e.target[1].value
            //use session data to include uploading user and stuff
        };

        //await successful form submission before redirecting

        //navigate us to map page

        //placeholder test result - log data to console until we have a backend to send to
        if(errMsg) { errMsg.textContent = ""; }
        console.log(reqBody);
    };

    return (
        <div>
            <h2>Drop a pin where the incident occurred:</h2>
            <MapModule mode={'report'} setCurrentPoint={setCurrentPoint} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="incident-time">Time of Incident</label>
                <input type="datetime-local" id="incident-time" name="incident-time"></input>
                <br></br>
                <label htmlFor="report-time">Time of Report</label>
                <input type="datetime-local" id="report-time" name="incident-time"></input>
                <br></br>
                <label htmlFor="title">Title</label>
                <input id="title" name="title"></input>
                <br></br>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description"></textarea>
                <button>Submit</button>
            </form>
            <p id="formErrorMessage"></p>
        </div>
    );
};