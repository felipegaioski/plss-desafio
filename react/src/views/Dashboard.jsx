import { useEffect, useState } from "react";
import { getDashboard } from "../services/DashboardService.js";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getDashboard().then(({ data }) => {
            setData(data);
            setLoading(false);
        }).then(() => setLoading(false))
        .finally(() => setLoading(false));
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>

            { loading && <div className="loading">Carregando...</div> }
            { !loading && 
            <>
                <div className="summary-cards">
                    <div className="card">
                        <h3>Total Usuários</h3>
                        <p>{data.total_users}</p>
                    </div>
                    <div className="card">
                        <h3>Total Obras</h3>
                        <p>{data.total_constructions}</p>
                    </div>
                    <div className="card">
                        <h3>Total Medições</h3>
                        <p>{data.total_measurements}</p>
                    </div>
                </div>

                <div className="card full-width">
                    <h3>Estatísticas de Medições</h3>
                    <ul className="stats-list common-text">
                        <li><strong>Hoje:</strong> {data.measurement_stats.today}</li>
                        <li><strong>Essa Semana:</strong> {data.measurement_stats.this_week}</li>
                        <li><strong>Esse Mês:</strong> {data.measurement_stats.this_month}</li>
                    </ul>
                </div>

                {/* <div className="card full-width">
                    <h3>Obras Recentes</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Data de Criação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.recent_constructions.map(construction => (
                                <tr key={construction.id}>
                                    <td>{construction.id}</td>
                                    <td>{construction.name}</td>
                                    <td>{new Date(construction.created_at).toLocaleDateString('pt-BR')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}
            </>
            }
        </div>
    );
}
