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
      const eventStyle = {
        color: 'white',
        backgroundColor: '#007bff',
        borderRadius: '5px',
        padding: '5px',
        cursor: 'pointer',
      };
      const handleEventClick = (event) => {
        // Check if the event has the 'zoomMeetingUrl' property
        if (event.zoomMeetingUrl) {
          window.open(event.zoomMeetingUrl, '_blank'); // Open the Zoom meeting URL in a new tab
        }
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
                eventPropGetter={() => ({
                    style: eventStyle,
                  })}
                  onSelectEvent={handleEventClick}
              /> : null
            }
            </div>
            
            
        </div>
     );
}
 
export default EventCalender;