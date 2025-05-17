import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function MeasurementForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext();
    const [measurement, setMeasurement] = useState({
        id: null,
        amount: null,
        observation: '',
        
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/measurements/${id}`).then(({data}) => {
                setMeasurement(data.measurement);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();

        if (measurement.id) {
            axiosClient.put(`/measurements/${measurement.id}`, measurement).then(({data}) => {
                setNotification('Obra atualizada com sucesso!');
                navigate('/measurements');
            }).catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
        } else {
            axiosClient.post(`/measurements`, measurement).then(({data}) => {
                setNotification('Obra criada com sucesso!');
                navigate('/measurements');
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
            {measurement.id ? <h1>Editando Obra</h1> : <h1>Nova Obra</h1>}
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
                        <label htmlFor="name"><strong>Medida</strong></label>
                        <input value={measurement.name} onChange={ev => setMeasurement({...measurement, name: ev.target.value})} type="text" placeholder="Nome"/>
                        <label htmlFor="description"><strong>Descrição</strong></label>
                        <input value={measurement.description} onChange={ev => setMeasurement({...measurement, description: ev.target.value})} type="text" placeholder="Descrição"/>
                        <button className="btn" type="submit">Salvar</button>
                    </form>
                }
            </div>
        </div>
    );
}