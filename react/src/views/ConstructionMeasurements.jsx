import { useState, useEffect } from "react";
import axiosClient from "../axios-client.js";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function ConstructionMeasurements() {
    const { id } = useParams();
    const [construction, setConstruction] = useState({ measurements: [] });
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/constructions/${id}`).then(({data}) => {
                console.log(data);
                
                setConstruction(data.construction);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        }, []);
    }

    const onDelete = (measurement) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            axiosClient.delete(`/measurements/${measurement.id}`).then(() => {
                setNotification('Obra excluída com sucesso!');
            });
        }
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Registros de medida - {construction.name}</h1>
                <Link to="/measurements/new" className="btn-add">Criar Nova</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Medida</th>
                            <th>Tipo</th>
                            <th>Data da medição</th>
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
                            {construction.measurements && construction.measurements.map(measurement => {
                                return (
                                    <tr key={measurement.id}>
                                        <td>{measurement.id}</td>
                                        <td>
                                            {new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(measurement.amount)}
                                            {measurement.unit.abbreviation}
                                        </td>
                                        <td>{measurement.unit.unit_category.name}</td>
                                        <td>{new Date(measurement.measured_at).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
                                        <td style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                                            <Link to={`/measurements/${measurement.id}`} className="btn-edit">Editar</Link>
                                            &nbsp;
                                            <button onClick={ev => onDelete(measurement)} className="btn-delete">Excluir</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    }
                    {!construction.measurements.length && !loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    <span>Nenhum registro encontrado.</span>
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
        </div>
    );
}