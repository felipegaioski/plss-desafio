import { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Constructions() {
    const [construction, setConstruction] = useState([]);
    const [constructions, setConstructions] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getConstructions();
    }, []);

    const getConstructions = () => {
        setLoading(true);
        axiosClient.get('/constructions').then(({data}) => {
            console.log(data);
            setConstructions(data.constructions);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    };

    const onDelete = (construction) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            axiosClient.delete(`/constructions/${construction.id}`).then(() => {
                setNotification('Obra excluída com sucesso!');
                getConstructions();
            });
        }
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Obras</h1>
                <Link to="/constructions/new" className="btn-add">Criar Nova</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Data de Criação</th>
                            <th></th>
                        </tr>
                    </thead>
                    {loading && 
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    <span>Carregando...</span>
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!loading && 
                        <tbody>
                            {constructions.map(construction => {
                                return (
                                    <tr key={construction.id}>
                                        <td>{construction.id}</td>
                                        <td>{construction.name}</td>
                                        <td>{construction.description}</td>
                                        <td>{new Date(construction.created_at).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
                                        <td style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                                            <Link to={`/constructions/${construction.id}`} className="btn-edit">Editar</Link>
                                            &nbsp;
                                            <button onClick={ev => onDelete(construction)} className="btn-delete">Excluir</button>
                                            &nbsp;
                                            <Link to={`/constructions/${construction.id}/measurements`} className="btn-edit">Medições</Link>
                                            &nbsp;
                                            <Link to={`/constructions/${construction.id}/measurements/new`} className="btn-edit">Nova Medição</Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    }
                    {!constructions.length && !loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    <span>Nenhuma obra encontrada.</span>
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
        </div>
    );
}