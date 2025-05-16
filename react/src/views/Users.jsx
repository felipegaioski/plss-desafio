import { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Users() {
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('/users').then(({data}) => {
            console.log(data);
            setUsers(data.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    };

    const onDelete = (user) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            axiosClient.delete(`/users/${user.id}`).then(() => {
                getUsers();
            });
        }
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">Criar Novo</Link>
            </div>
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
                                <td colSpan="5" className="text-center">
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
                                            <Link to={`/users/${user.id}`} className="btn-edit">Editar</Link>
                                            &nbsp;
                                            <button onClick={ev => onDelete(user)} className="btn-delete">Excluir</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    );
}