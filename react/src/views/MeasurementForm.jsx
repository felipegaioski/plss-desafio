import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getMeasurement } from "../services/MeasurementService.js";
import { storeMeasurement, updateMeasurement } from "../services/MeasurementService.js";
import { getUnits } from "../services/UnitService.js";
import { getUnitCategories } from "../services/UnitCategoryService.js";
import { Container, Row, Col } from 'react-bootstrap';
import { getConstruction } from "../services/ConstructionService.js";

export default function MeasurementForm() {
    const { constructionId, id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const {setNotification} = useStateContext();
    const [unitCategories, setUnitCategories] = useState([]);
    const [allUnits, setAllUnits] = useState([]);
    const [filteredUnits, setFilteredUnits] = useState([]);
    const [construction, setConstruction] = useState({
        id: null,
        name: '',
        description: '',
    });
    const [measurement, setMeasurement] = useState({
        id: null,
        amount: '',
        observation: '',
        measured_at: '',
        unit_id: null,
        construction_id: constructionId,
    });

    useEffect(() => {
        setLoading(true);
        getConstruction(constructionId)
            .then(({ data }) => {
                if (data.construction) {
                    setConstruction(data.construction);
                } else {
                    setConstruction(data);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setLoading(true);
        getUnitCategories()
            .then(({ data }) => {
                setUnitCategories(data.unit_categories);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        getUnits().then(({ data }) => setAllUnits(data.units));
    }, []);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getMeasurement(id)
            .then(({ data }) => {
                const _measurement = data.measurement;
                const measuredAt = _measurement.measured_at
                    ? new Date(_measurement.measured_at).toISOString().slice(0, 16)
                    : '';

                const selectedUnit = allUnits.find(u => u.id === _measurement.unit_id);
                const unitCategoryId = selectedUnit?.unit_category_id || '';

                setMeasurement({
                    ..._measurement,
                    measured_at: measuredAt,
                    unit_category_id: unitCategoryId,
                });
            })
            .catch(() => {
                setLoading(false);
            })
            .finally(() => setLoading(false));
    }, [id, allUnits]);


    useEffect(() => {
        if (!measurement.unit_category_id) {
            setFilteredUnits([]);
            setMeasurement(prev => ({ ...prev, unit_id: '' }));
            return;
        }

        const filtered = allUnits.filter(
            unit => unit.unit_category_id == measurement.unit_category_id
        );
        setFilteredUnits(filtered);
    }, [measurement.unit_category_id, allUnits]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = { ...measurement, construction_id: constructionId };

        const action = measurement.id
            ? updateMeasurement(measurement.id, payload)
            : storeMeasurement(payload);

        action
            .then(() => {
                setNotification(
                    measurement.id ? "Medição atualizada com sucesso!" : "Medição criada com sucesso!"
                );
                navigate(`/constructions/${constructionId}/measurements`);
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
            <h1>{measurement.id ? "Editando Medição" : "Nova Medição"}</h1>
            <div className="card animated fadeInDown">
                <div className="card">
                    <h4>Obra: {construction.name}</h4>
                </div>
                {loading && <div className="text-center common-text">Carregando...</div>}

                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                {!loading && (
                    <form onSubmit={onSubmit}>
                        <Row>
                            <Col md="4">
                                <label><strong>Medida</strong></label>
                                <input
                                type="number"
                                value={measurement.amount}
                                onChange={(ev) =>
                                    setMeasurement({ ...measurement, amount: ev.target.value })
                                }
                                placeholder="Medida"
                                />
                            </Col>
                            <Col md="4">
                                <label><strong>Categoria da unidade</strong></label>
                                <select
                                    value={measurement.unit_category_id || ''}
                                    onChange={(ev) => {
                                        const categoryId = ev.target.value;
                                        setMeasurement({
                                            ...measurement,
                                            unit_category_id: categoryId,
                                            unit_id: ''
                                        });
                                    }}
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {unitCategories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </Col>
                            <Col md="4">
                                <label><strong>Unidade</strong></label>
                                <br />
                                <select
                                    value={measurement.unit_id || ''}
                                    onChange={(ev) => {
                                        setMeasurement({ ...measurement, unit_id: ev.target.value });
                                    }}
                                    disabled={!measurement.unit_category_id}
                                >
                                    <option value="">Selecione uma unidade</option>
                                    {filteredUnits.map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.name} ({unit.abbreviation})
                                        </option>
                                    ))}
                                </select>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col md="12">
                                <label><strong>Observação</strong></label>
                                <br />
                                <textarea
                                    value={measurement.observation}
                                    onChange={(ev) =>
                                        setMeasurement({ ...measurement, observation: ev.target.value })
                                    }
                                    placeholder="Observação"
                                    style={{ minHeight: '150px', width: '100%' }}
                                />
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col md="4">
                                <label><strong>Data da medição</strong></label>
                                <input
                                    type="datetime-local"
                                    value={measurement.measured_at}
                                    onChange={(ev) =>
                                        setMeasurement({ ...measurement, measured_at: ev.target.value })
                                    }
                                />
                            </Col>
                        </Row>

                        <button className="btn mt-3" type="submit">Salvar</button>
                    </form>
                )}
            </div>
        </div>

    );
}