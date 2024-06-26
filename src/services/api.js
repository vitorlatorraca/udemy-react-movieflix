import axios from "axios";

// BASE DA URL 
// URL DA API 

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

export default api;