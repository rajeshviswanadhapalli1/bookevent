import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from 'moment';
import { createZoomMeeting } from "../common/zoomapi";
import axios from "axios";

// import './App.css';
// import Resources from 'util';
const BookUser = () => {
    let navigate = useNavigate();
   const [eventname,setEventName] = useState('');
   const [date,setDate] = useState(new Date());
   const [startTime,setStartTime] = useState('')
   const [endTime,setEndTime] = useState('')
   const [isEndTimeValid, setIsEndTimeValid] = useState(true);
    const [message, setMessage] = useState("");
    const { user } = useParams();
    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
        validateEndTime(e.target.value, endTime);
      };
    
      const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
        validateEndTime(startTime, e.target.value);
      };
    
      const validateEndTime = (start, end) => {
        const startTimeObject = new Date(`1970-01-01T${start}`);
        const endTimeObject = new Date(`1970-01-01T${end}`);
        setIsEndTimeValid(endTimeObject >= startTimeObject);
      };
    //👇🏻 logs the user's details to the console
   const bookevent = async() => {
    if(!eventname){
        toast.error('Enter Event Name')
    }else if(!date) {
        toast.error('Select Date')
    }else if(!startTime){
        toast.error('select Start Time')
    }else if(!endTime){
        toast.error('select End Time')
    }else if(!isEndTimeValid){
        toast.error('End time must be after start time')
    }else{
        try {
                const st = moment(`${date} ${startTime}`);
  const et = moment(`${date} ${endTime}`);
  const meetdata = {
    title:eventname,
                date:date,
                startTime:st,
                endTime:et
  }
 const data = await axios.get('http://localhost:5000/api/v1/auth/zoom/callback');
 console.log(data,'data');
            const obj = {
                title:eventname,
                date:date,
                startTime:st,
                endTime:et,
                // url:zoomMeetingUrl
            }
            console.log(obj,'obj');
            // const data = await localStorage.getItem('eventdata');
            // console.log(data,'data');
            // if(data !== null){
            //     console.log('if condition');
            //     const fer = JSON.parse(data)
            //     let arr = [...fer]
            //    arr.push(obj);
            //    const detset = await localStorage.setItem('eventdata',JSON.stringify(arr))
               
            //     navigate('/eventcalender')
            // }else{
            //     console.log('else condition');
            //     let arr = [];
            //     let der = arr.push(obj);
            //     const detset = await localStorage.setItem('eventdata',JSON.stringify(arr))
            //     navigate('/eventcalender')
            // }

        } catch (ex) {
            console.log(ex,"error displaying")
        }   
    }
       
   }
    return (
        <div className='bookContainer'>
            <h2 className='bookTitle'>Book a Events</h2>
            <div className='booking__form'>
                <label htmlFor='fullName'>Event Name</label>
                <input
                    id='eventname'
                    name='eventname'
                    type='text'
                    required
                    value={eventname}
                    onChange={(e) => setEventName(e.target.value)}
                />
                <label htmlFor='email'>Date</label>
                <input
                    
                    name='date'
                    required
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <label htmlFor='email'>Start Time</label>
                <input
                    
                    name='time'
                    required
                    type='time'
                    value={startTime}
                    onChange={handleStartTimeChange}
                />
                <label htmlFor='email'>End Time</label>
                <input
                    
                    name='endtime'
                    required
                    type='time'
                    value={endTime}
                    onChange={handleEndTimeChange}
                />
                {isEndTimeValid ? null : <p style={{color:'red',marginBottom:'10px'}}>End time must be after start time.</p>}
                <label htmlFor='message'>Any important note? (optional)</label>
                <textarea
                    rows={5}
                    name='message'
                    id='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                {/* <label htmlFor='session'>
                    Select your preferred session - GMT+2 Jerusalem
                </label> */}

                <button onClick={() => bookevent()} className='bookingBtn'>Book Event</button>
            </div>
        </div>
    );
};

export default BookUser;