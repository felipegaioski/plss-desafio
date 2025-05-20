import React, { useState, useEffect } from "react";
import axiosClient from "../api/axios-client.js";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getConstruction } from "../services/ConstructionService.js";
import { getMeasurements } from "../services/MeasurementService.js";
import { deleteMeasurement, getMeasurement } from "../services/MeasurementService.js";

export default function ConstructionMeasurements() {
    const { id } = useParams();
    const [construction, setConstruction] = useState({ measurements: [] });
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [expandedIds, setExpandedIds] = useState(new Set());
    const [measurements, setMeasurements] = useState([]);
    const [pagination, setPagination] = useState({});

    const toggleExpand = (id) => {
        const newExpanded = new Set(expandedIds);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedIds(newExpanded);
    };

   useEffect(() => {
        if (!id) return;
        fetchConstruction();
        fetchMeasurements();
    }, [id]);

    const fetchConstruction = () => {
        setLoading(true);
        getConstruction(id)
            .then(({ data }) => {
                setConstruction(data.construction);
            })
            .finally(() => setLoading(false));
    };

    const fetchMeasurements = (page = 1) => {
        setLoading(true);
        getMeasurements({ construction_id: id, page }, ['unit.unitCategory'])
            .then(({ data }) => {
                setMeasurements(data.measurements.data);
                setPagination({
                    currentPage: data.measurements.current_page,
                    lastPage: data.measurements.last_page,
                    perPage: data.measurements.per_page,
                    total: data.measurements.total,
                });
            })
            .finally(() => setLoading(false));
    };

    const onDelete = (measurement) => {
        if (window.confirm('Tem certeza que deseja excluir?')) {
            deleteMeasurement(measurement.id).then(() => {
                setNotification('Medição excluída com sucesso!');
                fetchMeasurements(pagination.currentPage);
            });
        }
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Registros de medida - {construction.name}</h1>
                <Link to={`/constructions/${construction.id}/measurements/new`} className="btn-add">Criar Nova</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th></th>
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
                                <td colSpan="6" className="text-center">
                                    <span>Carregando...</span>
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!loading && 
                        <tbody>
                            {measurements && measurements.map(measurement => {

                                const isExpanded = expandedIds.has(measurement.id);
                                return (
                                    <React.Fragment key={measurement.id}>
                                        <tr>
                                            <td>
                                                <button 
                                                    onClick={() => toggleExpand(measurement.id)} 
                                                    aria-label={isExpanded ? "Fechar observação" : "Abrir observação"}
                                                    style={{background: 'none', border: 'none', cursor: 'pointer'}}
                                                >
                                                    <span style={{display: 'inline-block', transition: 'transform 0.3s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}}>
                                                        ▶
                                                        {/* <span style={{ fontSize: '2em', fontWeight: 'bold' }}>&#8250;</span> */}
                                                    </span>
                                                </button>
                                            </td>
                                            <td>{measurement.id}</td>
                                            <td>
                                                {new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(measurement.amount)}
                                                &nbsp;
                                                {measurement.unit.abbreviation}
                                            </td>
                                            <td>{measurement.unit.unit_category.name}</td>
                                            <td>{new Date(measurement.measured_at).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'})}</td>
                                            <td style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
                                                <Link to={`/constructions/${construction.id}/measurements/${measurement.id}`} className="btn-edit">Editar</Link>
                                                &nbsp;
                                                <button onClick={ev => onDelete(measurement)} className="btn-delete">Excluir</button>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr>
                                                <td colSpan="6" style={{
                                                    padding: '10px 20px',
                                                    backgroundColor: '#f9f9f9',
                                                    animation: 'fadeInDrop 0.3s ease forwards',
                                                    whiteSpace: 'pre-wrap'
                                                }}>
                                                    <strong>Observação:</strong> {measurement.observation || <em>--</em>}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    }
                    {!measurements.length && !loading &&
                        <tbody>
                            <tr>
                                <td colSpan="6" className="text-center">
                                    <span>Nenhum registro encontrado.</span>
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
            <div className="pagination mt-3 flex justify-center text-center">
                <button onClick={() => fetchMeasurements(pagination.currentPage - 1)} disabled={pagination.currentPage === 1}>&laquo;</button>
                <button onClick={() => fetchMeasurements(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.lastPage}>&raquo;</button>
            </div>

            <style>{`
                @keyframes fadeInDrop {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}