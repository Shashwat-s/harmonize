import axios from 'axios';

const API_URL = 'http://192.168.29.31:5001/api';

const client = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
