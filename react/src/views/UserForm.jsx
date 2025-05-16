import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";

export default function UserForm() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
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
    }

    return (
        <div>
            {user.id ? <h1>Editando Usuário</h1> : <h1>Novo Usuário</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Carregando...</div>}
                { errors && (
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && 
                    <form onSubmit={onSubmit}>
                        <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} type="text" placeholder="Nome"/>
                        <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} type="email" placeholder="E-mail"/>
                        <input onChange={ev => setUser({...user, password: ev.target.value})} type="password" placeholder="Senha"/>
                        <input onChange={ev => setUser({...user, password_confirmation: ev.target.value})} type="password" placeholder="Confirma Senha"/>
                        <button className="btn" type="submit">Salvar</button>
                    </form>
                }
            </div>
        </div>
    );
}