import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from '../../services/api'

function Filme() {
    const { id } = useParams();
    
    useEffect(() => {  // Correção aqui: fechamento correto do useEffect
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "512f6c5c7620fb7821612a4adebfa5f6"
                }
            })
            .then((response) => {
                console.log(response);
            })
            .catch(() => {
                console.log("Erro ao carregar o filme");
            })
        }

        loadFilme();  
    }, []);  

    return (
        <div>
            <h1>ACESSANDO FILME {id}</h1>
        </div>
    )
}

export default Filme;
