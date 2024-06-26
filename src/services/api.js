import axios from "axios";

// BASE DA URL https://api.themoviedb.org/3
// URL DA APIhttps://api.themoviedb.org/3/movie/now_playing?api_key=512f6c5c7620fb7821612a4adebfa5f6&language=en-US

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

export default api;