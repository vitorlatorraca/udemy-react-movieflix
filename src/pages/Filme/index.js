import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css'

import api from '../../services/api'

function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState();
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {  // Correção aqui: fechamento correto do useEffect
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
                console.log("Erro ao carregar o filme");
                navigate("/", { replace: true })
                return;
            })
        }

        loadFilme();  


        return () => {
            console.log("Componente foi desmontado")
        }
    }, [navigate, id]);  

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id  === filme.id)

        if(hasFilme){
            alert("Esse filme já está na sua lista!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        alert("FILMES SALVOS COM SUCESSO")

    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliacao: {filme.vote_average} /10 </strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
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
