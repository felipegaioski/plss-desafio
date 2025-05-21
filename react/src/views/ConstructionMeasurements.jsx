import React, { useState, useEffect } from "react";
import axiosClient from "../api/axios-client.js";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getConstruction } from "../services/ConstructionService.js";
import { getMeasurements } from "../services/MeasurementService.js";
import { deleteMeasurement, getMeasurement } from "../services/MeasurementService.js";
import { getUnits } from "../services/UnitService.js";
import { getUnitCategories } from "../services/UnitCategoryService.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export default function ConstructionMeasurements() {
    const { id } = useParams();
    const [construction, setConstruction] = useState({ measurements: [] });
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [expandedIds, setExpandedIds] = useState(new Set());
    const [measurements, setMeasurements] = useState([]);
    const [pagination, setPagination] = useState({});
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        category: '',
        unit: '',
        minAmount: '',
        maxAmount: '',
    });

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
        fetchCategories();
        fetchUnits();
    }, [id]);

    const fetchCategories = () => {
        getUnitCategories()
            .then(({ data }) => {
                setCategories(data.unit_categories);
            });
    }

    const fetchUnits = () => {
        getUnits()
            .then(({ data }) => {
                setUnits(data.units);
            });
    }

    const fetchConstruction = () => {
        setLoading(true);
        getConstruction(id)
            .then(({ data }) => {
                if (data.construction) {
                    setConstruction(data.construction);
                } else {
                    setConstruction(data);
                }
            })
            .finally(() => setLoading(false));
    };

    const fetchMeasurements = (page = 1, customFilters = filters) => {
        setLoading(true);
        const params = {
            construction_id: id,
            page,
            start_date: customFilters.startDate,
            end_date: customFilters.endDate,
            category_id: customFilters.category,
            unit_id: customFilters.unit,
            min_amount: customFilters.minAmount,
            max_amount: customFilters.maxAmount,
        };

        Object.keys(params).forEach(key => {
            if (!params[key]) delete params[key];
        });

        getMeasurements(params, ['unit.unitCategory'])
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

    const handleFilterClick = () => {
        setShowFilter(prev => !prev);
    };

    return (
        <div>
            {construction &&
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Registros de medida - {construction.name}</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                            onClick={handleFilterClick}
                            className="btn-filter"
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#555')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#444')}
                        >
                            <FontAwesomeIcon icon={faFilter} size="lg" />
                        </div>
                        <Link to={`/constructions/${construction.id}/measurements/new`} className="btn-add">Criar Nova</Link>
                    </div>
                </div>
            }
            { showFilter &&
                <div className="card animated fadeInDown" style={{ marginBottom: '1rem' }}>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            fetchMeasurements(1);
                        }}
                        style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end' }}
                    >
                        <div>
                            <label>Data Início:</label>
                            <input
                                type="date"
                                value={filters.startDate}
                                onChange={e => setFilters({ ...filters, startDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Data Fim:</label>
                            <input
                                type="date"
                                value={filters.endDate}
                                onChange={e => setFilters({ ...filters, endDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Categoria:</label>
                            <select
                                value={filters.category}
                                onChange={e => setFilters({ ...filters, category: e.target.value })}
                            >
                                <option value="">Todas</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Unidade:</label>
                            <select
                                value={filters.unit}
                                onChange={e => setFilters({ ...filters, unit: e.target.value })}
                            >
                                <option value="">Todas</option>
                                {units.map(unit => (
                                    <option key={unit.id} value={unit.id}>{unit.abbreviation}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Valor Mínimo:</label>
                            <input
                                type="number"
                                step="0.01"
                                value={filters.minAmount}
                                onChange={e => setFilters({ ...filters, minAmount: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Valor Máximo:</label>
                            <input
                                type="number"
                                step="0.01"
                                value={filters.maxAmount}
                                onChange={e => setFilters({ ...filters, maxAmount: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn">Filtrar</button>
                        <button
                            type="button"
                            className="btn"
                            onClick={() => {
                                const cleared = {
                                    startDate: '',
                                    endDate: '',
                                    category: '',
                                    unit: '',
                                    minValue: '',
                                    maxValue: '',
                                };
                                setFilters(cleared);
                                fetchMeasurements(1, cleared);
                            }}
                        >
                            Limpar
                        </button>
                    </form>
                </div>
            }

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
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="6" className="text-center common-text">
                                    <span>Carregando...</span>
                                </td>
                            </tr>
                        )}

                        {!loading && measurements.length > 0 && measurements.map(measurement => {
                            const isExpanded = expandedIds.has(measurement.id);
                            return (
                                <React.Fragment key={measurement.id}>
                                    <tr>
                                        <td>
                                            <button
                                                onClick={() => toggleExpand(measurement.id)}
                                                aria-label={isExpanded ? "Fechar observação" : "Abrir observação"}
                                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                            >
                                                <span style={{ display: 'inline-block', transition: 'transform 0.3s', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                                                    ▶
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
                                        <td>{new Date(measurement.measured_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                                        <td style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                            <Link to={`/constructions/${construction.id}/measurements/${measurement.id}`} className="btn-edit">Editar</Link>
                                            &nbsp;
                                            <button onClick={ev => onDelete(measurement)} className="btn-delete">Excluir</button>
                                        </td>
                                    </tr>
                                    {isExpanded && (
                                        <tr>
                                            <td colSpan="6" className="observation">
                                                <strong>Observação:</strong> {measurement.observation || <em>--</em>}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}

                        {!loading && measurements.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center common-text">
                                    <span>Nenhum registro encontrado.</span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
            <div className="pagination mt-3 flex justify-center text-center">
                <button onClick={() => fetchMeasurements(pagination.currentPage - 1)} disabled={pagination.currentPage === 1} className="page-arrows">&laquo;</button>
                <button onClick={() => fetchMeasurements(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.lastPage} className="page-arrows">&raquo;</button>
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