import React, { useState } from 'react';
import { data } from 'azure-maps-control';
import MapModule from '../MapModule.tsx';

export default function Report() {
    const [currentPoint, setCurrentPoint] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errMsg = document.querySelector("#formErrorMessage");
        
        //validate input before sending to server
        if(!currentPoint) {
            if(errMsg) { errMsg.textContent = 'No location pinned.'; }
            return;
        } else if(!e.target[0].value.trim()) {
            if(errMsg) { errMsg.textContent = 'Select an incident time.'; }
            return;
        } else if(!e.target[1].value.trim()) {
            if(errMsg) { errMsg.textContent = 'Enter a brief summary.'; }
            return;
        }

        //package the input for shipping to server
        const reqBody = {
            locationX:currentPoint.coordinates[0],
            locationY:currentPoint.coordinates[1],
            description:e.target[0].value.trim(),
            notes:e.target[1].value.trim(),
            personofinterest:e.target[2].value.trim()
            //use session data to include uploading user and stuff
        };

        //await successful form submission before redirecting
        const url = 'http://localhost:3001/incidents'; //path to our back end to post a new incident
        const token = 'sdg'; //jwt to be read from localstorage
        await fetch(url,{
            method: "post",
            headers:{
                authorization:'Bearer ' + token
            },
            body:reqBody
        }).then(res=>res.json()).then(data=>{
            console.log(data);
        }).catch(err=>{
            console.log(err);
        });

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
                <label htmlFor="description">Summary</label>
                <input id="description" name="description"></input>
                <br></br>
                <label htmlFor="notes">Description/Notes</label>
                <textarea id="notes" name="notes"></textarea>
                <br></br>
                <label htmlFor="personofinterest">Person of Interest</label>
                <textarea id="personofinterest" name="personofinterest"></textarea>
                <button>Submit</button>
            </form>
            <p id="formErrorMessage"></p>
        </div>
    );
};