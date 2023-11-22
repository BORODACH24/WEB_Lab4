import React, { useState, useEffect } from 'react';
import classes from "./DatePlate.module.css";
const DatePlate = () => {
    const [currentDateTime, setCurrentDateTime] = useState(null);
    const [userTimeZone, setUserTimeZone] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            // Get the current date and time
            const now = new Date();

            // Get the user's time zone
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // Format the date and time
            const formattedDateTime = new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                // timeZoneName: 'short',
                hour12: false, // Display hours in 24-hour format
            }).format(now);

            // Update state
            setCurrentDateTime(formattedDateTime);
            setUserTimeZone(timeZone);
        };

        // Fetch data initially
        fetchData();

        // Set up an interval to update the data every second
        const intervalId = setInterval(fetchData, 1000);

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);

    }, []); // Empty dependency array ensures the effect runs only once, when the component mounts

    return (
        <div className={classes.datePlate}>
            <label className={classes.dateTitle}>Current Date and Time</label>
            <hr/>
            {currentDateTime && (
                <div className={classes.dateBody}>
                    <label>{currentDateTime}</label>
                    <label>User Time Zone: {userTimeZone}</label>
                </div>
            )}
        </div>
    );
};

export default DatePlate;
