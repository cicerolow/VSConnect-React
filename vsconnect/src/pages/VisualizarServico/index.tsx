//estilização
import "./style.css";

//components

//rotas
import { Link, useParams } from "react-router-dom";

//hooks
import { useEffect, useState } from "react";

//axios
import api from "../../utils/api";

function VisualizarServico() {

    const { idServico } = useParams();
    const [proposta, setProposta] = useState<string>("");
    const [titulo, setTitulo] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [listatechs, setTechs] = useState<[string]>([""]);

    function buscarServicoPorId() {
        api.get("servicos/" + idServico)
            .then((response: any) => {
                console.log(response);

                setProposta(response.data.proposta);
                setTitulo(response.data.nome);
                setDescricao(response.data.descricao);
                setTechs(response.data.techs);

            })
            .catch((error: any) => console.log(error))

    }


useEffect(()=> {
    buscarServicoPorId();
}, []);

return (
    <main id="main_visualizarservico">
        <div className="container">
            <h1>Serviço</h1>
            <div className="servico">
                <div className="topo_servico">
                    <h2>{titulo}</h2>
                    <span>{proposta}</span>
                </div>
                <p>{descricao}</p>
                <div className="techs">
                    {
                        listatechs.map((tech: string, indice: number) => {
                            return <span key={indice}>{tech}</span>

                        })
                    }
                </div>
            </div>
        </div>

    </main>);
}

export default VisualizarServico;