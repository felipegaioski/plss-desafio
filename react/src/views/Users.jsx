import { useState, useEffect } from "react";
import axiosClient from "../api/axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getUsers } from "../services/UserService.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { deleteUser } from "../services/UserService.js";

export default function Users() {
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [pagination, setPagination] = useState({});
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({
        id: '',
        name: '',
        email: '',
    });
    const { user: currentUser } = useStateContext();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = (page = 1) => {
        setLoading(true);
        getUsers({ page, ...filters }, [])
            .then(({ data }) => {
                setUsers(data.users.data.map(user => ({
                    ...user,
                    created_at: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(user.created_at)),
                })));
                setPagination({
                    currentPage: data.users.current_page,
                    lastPage: data.users.last_page,
                    perPage: data.users.per_page,
                    total: data.users.total,
                });
            })
        .finally(() => setLoading(false));
    };

    const onDelete = (user) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            deleteUser(user.id).then(() => {
                setNotification('Usuário excluido com sucesso!');
                getUsers();
            });
        }
    };

    const handleFilterClick = () => {
        setShowFilter(prev => !prev);
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>Usuários</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                        onClick={handleFilterClick}
                        className="btn-filter"
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#555')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#444')}
                    >
                        <FontAwesomeIcon icon={faFilter} size="lg" />
                    </div>
                    <Link to="/users/new" className="btn-add">Criar Novo</Link>
                </div>
            </div>
            {showFilter && (
                <div className="card animated fadeInDown" style={{ marginBottom: '1rem' }}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        fetchUsers(1);
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
                        <div>
                            <label htmlFor="filter-email">Email:</label>
                            <input
                                id="filter-email"
                                type="text"
                                value={filters.email}
                                onChange={e => setFilters({ ...filters, email: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn">Filtrar</button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => {
                                const cleared = { id: '', name: '', email: '',};
                                setFilters(cleared);
                                fetchUsers(1, cleared);
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
                            <th>Email</th>
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
                            {users.map(user => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.created_at}</td>
                                        <td>
                                            <Link to={`/users/${user.id}`} className="btn">Editar</Link>
                                            &nbsp;
                                            {user.id !== currentUser.id && (
                                                <button onClick={ev => onDelete(user)} className="btn-delete">Excluir</button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    }
                    {!users.length && !loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center common-text">
                                    <span>Nenhum usuário encontrado.</span>
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
            <div className="pagination mt-3 flex justify-center text-center">
                <button onClick={() => fetchUsers(pagination.currentPage - 1)} disabled={pagination.currentPage === 1} className="page-arrows">&laquo;</button>
                <button onClick={() => fetchUsers(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.lastPage} className="page-arrows">&raquo;</button>
            </div>
        </div>
    );
}