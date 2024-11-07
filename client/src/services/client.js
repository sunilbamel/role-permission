import axios from 'axios';

const URL = process.env.REACT_APP_BASE_URL;

export const apiPost = async (url, data) => {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token;
    const response = await axios.post(URL + url, data);
    return response;
}

export const apiGet = async (url) => {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = token;
    const response = await axios.get(URL + url);
    return response;
}