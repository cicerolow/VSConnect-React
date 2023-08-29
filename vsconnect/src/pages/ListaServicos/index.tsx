//estilização
import "./style.css";

//Rota
import {Link} from "react-router-dom";

//componentes
import CardServico from "../../components/CardServico";

//hooks
import { useEffect, useState } from "react";

import api from "../../utils/api";

function ListaServicos() {

    //STATE SERVICOS

    const [servico, setServico] = useState<any[]>([]);

    const [skillDigitado, setSkillDigitado] = useState<string>("");

    //função onde pega o que o usuario digitou
    
    function buscarServicoPorSkill(event: any) {
        //não recarrega a pagina
        event.preventDefault();

        //filtrar servicos pela skill digitada no campo buscar
        const servicoFiltrados = servico.filter((servico: any) => servico.hardSkills.includes(skillDigitado.toLocaleUpperCase()));

        if (event.target === "") {
            alert("Nenhum desenvolvedor com essa skill :(")
        } else {
            //atribui valor de servicos filtrado, ao state ListaServicosFiltrados 
            listarServicos();
        }


    }

    function listarServicos() {

        api.get("servicos")
            .then((response: any) => {
                console.log(response);
                setServico(response.data)
            })
            .catch((error: any) => {
                console.log("Error ao realizar um requisição:", error);
            })
    }

    useEffect(() => {
        //executa uma ação após o componente ser recarregado
        listarServicos();
    }, [])


    return (
        <main id="main_listaservico">
            <div className="container container_lista_servico">
                <div className="lista_servico_conteudo">
                    <h1>Lista de Serviços</h1>
                    <hr />
                    <form method="post" onSubmit={buscarServicoPorSkill}>
                        <div className="wrapper_form">
                            <label htmlFor="busca">Procurar serviços</label>
                            <div className="campo-label">
                                <input
                                    type="search"
                                    name="campo-busca"
                                    id="busca"
                                    placeholder="Buscar serviços por tecnologias..."
                                    onChange={buscarServicoPorSkill}
                                    autoComplete="off"
                                />
                                <button type="submit">Buscar</button>
                            </div>
                        </div>
                    </form>
                    <div className="wrapper_lista">
                        <ul>
                            {
                                servico.map((servico: any, indice: number) => {
                                    return <li key={indice}>
                                        <CardServico
                                            id={servico.id}
                                            proposta={servico.proposta}
                                            titulo={servico.titulo}
                                            descricao={servico.descricao}
                                            listaTechs={servico.techs}
                                        />
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ListaServicos;