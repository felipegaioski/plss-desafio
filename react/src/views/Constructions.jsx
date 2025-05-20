import { useState, useEffect } from "react";
import axiosClient from "../api/axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getConstructions } from "../services/ConstructionService.js";

export default function Constructions() {
    const [construction, setConstruction] = useState(null);
    const [constructions, setConstructions] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        fetchConstructions();
    }, []);

    const fetchConstructions = (page = 1) => {
        setLoading(true);
        getConstructions({ page }, ['latest_measurement'], ['latest_measurement'])
            .then(({ data }) => {
                setConstructions(data.constructions.data);
                setPagination({
                    currentPage: data.constructions.current_page,
                    lastPage: data.constructions.last_page,
                    perPage: data.constructions.per_page,
                    total: data.constructions.total,
                });
            })
            .finally(() => setLoading(false));
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
            <div className="pagination mt-3 flex justify-center text-center">
                <button onClick={() => fetchConstructions(pagination.currentPage - 1)} disabled={pagination.currentPage === 1}>&laquo;</button>
                <button onClick={() => fetchConstructions(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.lastPage}>&raquo;</button>
            </div>
        </div>
    );
}