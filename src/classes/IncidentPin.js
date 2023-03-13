import React from 'react';

export default class IncidentPin {
    description;
    notes;
    personofinterest;
    point;
    incidentTime;
    reportTime;
    reportingUser;
    reportingUserURL;

    constructor(point, description, notes, personofinterest, incidentTime, reportTime, reportingUser, reportingUserURL) {
        this.point = point;
        this.description = description;
        this.notes = notes;
        this.personofinterest = personofinterest;
        this.reportingUser = reportingUser;
        this.reportingUserURL = reportingUserURL;

        this.incidentTime = formatDate(incidentTime);
        this.reportTime = formatDate(reportTime);

        function formatDate(input) {
            let spl = [];
            if(input.includes('T')) {
                spl = input.split('T');
            } else {
                spl = input.split(' ');
            }
            const day = spl[0].split('-');
            const time = spl[1].split(':');
            let month = "Err";

            switch(day[1]) {
                case "01":
                    month = "Jan";
                    break;
                case "02":
                    month = "Feb";
                    break;
                case "03":
                    month = "Mar";
                    break;
                case "04":
                    month = "Apr";
                    break;
                case "05":
                    month = "May";
                    break;
                case "06":
                    month = "Jun";
                    break;
                case "07":
                    month = "Jul";
                    break;
                case "08":
                    month = "Aug";
                    break;
                case "09":
                    month = "Sep";
                    break;
                case "10":
                    month = "Oct";
                    break;
                case "11":
                    month = "Nov";
                    break;
                case "12":
                    month = "Dec";
                    break;
            }

            return month + " " + day[2] + ", " + day[0] + " - " + time[0] + ":" + time[1];
        }
    }

    getPin() {
        function conditionalDisplay(prompt, item, row) {
            if(item && row) {
                return <div><hr></hr><p>{prompt} {item}</p></div>;
            } else if (item) {
                return <div><p>{prompt} {item}</p></div>;;
            } else {
                return;
            }
        }
        return (
            <div className="incident-pin">
                <div className="info-display">
                    <header>
                        <h3>{this.description}</h3>
                    </header>
                    <p>Incident occurred {this.incidentTime}</p>
                    {conditionalDisplay("Notes:", this.notes, true)}
                    {conditionalDisplay("Person of Interest:", this.personofinterest, true)}
                    <hr></hr>
                    <p>Reported {this.reportTime}, by <a href={this.reportingUserURL}>{this.reportingUser}</a> {this.reportTime}</p>
                </div>
                <img src="/mappin.png"></img>
            </div>
        );
    }

    getCoords() {
        return this.point;
    }
}