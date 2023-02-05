import axios from 'axios';
const baseUrl = 'http://localhost:8080';

const getToday = async () => {
  try {
    const response = await axios.get(`${baseUrl}/today`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getToday
};
