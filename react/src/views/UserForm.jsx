import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { createUser, updateUser } from "../services/UserService.js";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/users/${id}`).then(({data}) => {
                setUser(data.user);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (user.id) {
            updateUser(id, user).then(({data}) => {
                setNotification('Usuário atualizado com sucesso!');
                navigate('/users');
            }).catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
        } else {
            createUser(user).then(({data}) => {
                setNotification('Usuário criado com sucesso!');
                navigate('/users');
            }).catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
        }
    }

    return (
        <div>
            {user.id ? <h1>Editando Usuário</h1> : <h1>Novo Usuário</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center common-text">Carregando...</div>}
                { errors && (
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && 
                    <form onSubmit={onSubmit}>
                        <label htmlFor="name"><strong>Nome</strong></label>
                        <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} type="text" placeholder="Nome"/>
                        <label htmlFor="email"><strong>E-mail</strong></label>
                        <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} type="email" placeholder="E-mail"/>
                        <label htmlFor="password"><strong>Senha</strong></label>
                        <input onChange={ev => setUser({...user, password: ev.target.value})} type="password" placeholder="Senha"/>
                        <label htmlFor="password_confirmation"><strong>Confirma Senha</strong></label>
                        <input onChange={ev => setUser({...user, password_confirmation: ev.target.value})} type="password" placeholder="Confirma Senha"/>
                        <button className="btn mt-3" type="submit">Salvar</button>
                    </form>
                }
            </div>
        </div>
    );
}