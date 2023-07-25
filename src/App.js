import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookUser from './components/Users/BookUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventCalender from './components/Users/eventcalendar';


function App() {
  return (
      <div>
        <ToastContainer />
       <BrowserRouter>
       <Routes>
       <Route path='/' element={<BookUser/>}/>
       <Route path='/eventcalender' element={<EventCalender/>}/>
 
       </Routes>
       </BrowserRouter>
      </div>
  );
}
export default App;