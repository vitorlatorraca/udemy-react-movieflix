import { useEffect, useState } from "react";
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './home.css'

// https://api.themoviedb.org/3/movie/now_playing?api_key=512f6c5c7620fb7821612a4adebfa5f6&language=en-US

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadMovies() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "512f6c5c7620fb7821612a4adebfa5f6",
                    page: 1,
                }
            })

            //console.log(response.data.results.slice(0, 10));
            setMovies(response.data.results.slice(0, 10))
            setLoading(false);

        }

        loadMovies();

    }, [])


    if (loading) {
        return (
            <div className="loading">
                <h2>Loading...</h2>
            </div>
        )
    }


    return (
        <div className="container">
            <div className="lista-filmes">
                {movies.map((movie) => {
                    return (
                        <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                            <Link to={`/movie/${movie.id}`}>Access</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;
