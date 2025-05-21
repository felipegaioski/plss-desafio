import { useState, useEffect } from "react";
import axiosClient from "../api/axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { deleteConstruction, getConstructions } from "../services/ConstructionService.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function Constructions() {
    const [construction, setConstruction] = useState(null);
    const [constructions, setConstructions] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({
        id: '',
        name: ''
    });

    useEffect(() => {
        fetchConstructions();
    }, []);

    const fetchConstructions = (page = 1, customFilters = filters) => {
        setLoading(true);
        getConstructions({ page, ...customFilters }, ['latest_measurement'], ['latest_measurement'])
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
        if (window.confirm('Tem certeza que deseja excluir? Todas os registros de medida dessa obra serão excluídos!')) {
            deleteConstruction(construction.id).then(() => {
                setNotification('Obra excluída com sucesso!');
                fetchConstructions();
            });
        }
    };

    const handleFilterClick = () => {
        setShowFilter(prev => !prev);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Obras</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                        onClick={handleFilterClick}
                        className="btn-filter"
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#555')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#444')}
                    >
                        <FontAwesomeIcon icon={faFilter} size="lg" />
                    </div>
                    <Link to="/constructions/new" className="btn-add">Criar Nova</Link>
                </div>
            </div>
            {showFilter && (
                <div className="card animated fadeInDown" style={{ marginBottom: '1rem' }}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        fetchConstructions(1);
                    }} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div>
                            <label htmlFor="filter-id">ID:</label>
                            <input
                                id="filter-id"
                                type="text"
                                value={filters.id}
                                onChange={e => setFilters({ ...filters, id: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="filter-name">Nome:</label>
                            <input
                                id="filter-name"
                                type="text"
                                value={filters.name}
                                onChange={e => setFilters({ ...filters, name: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn">Filtrar</button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => {
                                const cleared = { id: '', name: '' };
                                setFilters(cleared);
                                fetchConstructions(1, cleared);
                            }}
                        >
                            Limpar
                        </button>
                    </form>
                </div>
            )}
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
                                <td colSpan="5" className="text-center common-text">
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
                                        <td title={construction.description}>{construction.description.substring(0, 40)}{construction.description.length > 40 ? '...' : ''}</td>
                                        <td>{new Date(construction.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                        <td style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
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
                                <td colSpan="5" className="text-center common-text">
                                    <span>Nenhuma obra encontrada.</span>
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
            <div className="pagination mt-3 flex justify-center text-center">
                <button onClick={() => fetchConstructions(pagination.currentPage - 1)} disabled={pagination.currentPage === 1} className="page-arrows">&laquo;</button>
                <button onClick={() => fetchConstructions(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.lastPage} className="page-arrows">&raquo;</button>
            </div>
        </div>
    );
}