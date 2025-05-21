import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getConstruction } from "../services/ConstructionService.js";
import { storeConstruction, updateConstruction } from '../services/ConstructionService.js';

export default function ConstructionForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext();
    const [construction, setConstruction] = useState({
        id: null,
        name: '',
        description: '',
        address: '',
    });

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getConstruction(id, {})
            .then(({ data }) => {
                if (data.construction) {
                    setConstruction(data.construction);
                } else {
                    setConstruction(data);
                }
                
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const request = construction.id
            ? updateConstruction(construction.id, construction)
            : storeConstruction(construction);

        request
            .then(({ data }) => {
                setNotification(
                    construction.id
                        ? 'Obra atualizada com sucesso!'
                        : 'Obra criada com sucesso!'
                );
                navigate('/constructions');
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div>
            { construction.id ? <h1>Editando Obra</h1> : <h1>Nova Obra</h1>}
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
                        <input value={construction.name} onChange={ev => setConstruction({...construction, name: ev.target.value})} type="text" placeholder="Nome"/>
                        <label htmlFor="description"><strong>Descrição</strong></label>
                        <input value={construction.description} onChange={ev => setConstruction({...construction, description: ev.target.value})} type="text" placeholder="Descrição"/>
                        <label htmlFor="description"><strong>Endereço / Localização</strong></label>
                        <input value={construction.address} onChange={ev => setConstruction({...construction, address: ev.target.value})} type="text" placeholder="Endereço / Localização"/>
                        <button className="btn mt-3" type="submit">Salvar</button>
                    </form>
                }
            </div>
        </div>
    );
}