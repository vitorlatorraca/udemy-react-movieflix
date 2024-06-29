import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css'
import { toast } from 'react-toastify'

import api from '../../services/api'

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState();
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "512f6c5c7620fb7821612a4adebfa5f6"
                }
            })
            .then((response) => {
                setFilme(response.data)
                setLoading(false);
            })
            .catch(() => {
                console.log("Error loading the movie");
                navigate("/", { replace: true })
                return;
            })
        }

        loadFilme();  

        return () => {
            console.log("Component has been unmounted")
        }
    }, [navigate, id]);  

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id  === filme.id)

        if(hasFilme){
            toast.warn("This movie is already in your list")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Movie saved successfully")

    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Loading...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            
            <h3>Synopsis</h3>
            <span>{filme.overview}</span>

            <strong>Rating: {filme.vote_average} /10 </strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Save</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=$${filme.title} Trailer`} >
                    Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;
