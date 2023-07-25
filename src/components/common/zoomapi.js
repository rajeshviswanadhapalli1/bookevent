import axios from 'axios';

const ZOOM_API_KEY = 'uveX3ZbSPyHwFpyHDszEg';
const ZOOM_API_SECRET = 'xAaEIw7oBsTgR5V6Bt76PmmMd5Aa9A5y';


const createZoomMeeting = async (meetingData) => {
    try {
      const apiUrl = 'https://api.zoom.us/v2/users/me/meetings';
      const { title, date, startTime, endTime } = meetingData;
  
      const startTimeObj = new Date(startTime);
      const endTimeObj = new Date(endTime);
  
      const requestData = {
        topic: title,
        type: 2, // Scheduled meeting
        start_time: startTimeObj.toISOString(),
        duration: Math.floor((endTimeObj - startTimeObj) / (1000 * 60)), // Meeting duration in minutes
      };
  
      const response = await axios.post(apiUrl, requestData, {
        auth: {
          username: ZOOM_API_KEY,
          password: ZOOM_API_SECRET,
        },
      });
  
      return response.data.join_url;
    } catch (error) {
      console.error('Error creating Zoom meeting:', error.message);
      throw error;
    }
  };
  
  export { createZoomMeeting };