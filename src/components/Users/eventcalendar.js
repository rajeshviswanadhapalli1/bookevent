import React, { Component, useEffect,useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';


const EventCalender = () => {
    const localizer = momentLocalizer(moment);
    const [events,setEvents] = useState([])
    
    useEffect(() => {
        geteventdata();
    },[])
    const geteventdata = async() => {
        const dert = await localStorage.getItem('eventdata')
        console.log(dert,'dert');
        const dat = JSON.parse(dert);
        setEvents(dat)
    }
    const views = {
        month: true,
        // day: true,
        agenda: true
      };
//     const startTime = moment(`${eventObject.date} ${eventObject.startTime}`);
//   const endTime = moment(`${eventObject.date} ${eventObject.endTime}`);
    return ( 
        <div>
            <h1 style={{textAlign:'center',marginTop:'20px'}}>Event Calender</h1>
            <div style={{alignItems:'center',width:'60%',marginLeft:'20%',marginTop:'80px'}}>
            {events && events.length > 0 ? 
                <Calendar
                localizer={localizer}
                events={events}
                startAccessor="startTime"
                endAccessor="endTime"
                defaultView="month"
                views={views}
                style={{ height: 500,}}
              /> : null
            }
            </div>
            
            
        </div>
     );
}
 
export default EventCalender;