import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { getAudits } from "../services/AuditService.js";

export default function Audits() {
    const [audits, setAudits] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAudits();
    }, []);

    const fetchAudits = (page = 1) => {
        setLoading(true);
        getAudits({ page }, [])
            .then(({ data }) => {
                setAudits(data.data);
                setPagination({
                    currentPage: data.current_page,
                    lastPage: data.last_page,
                    perPage: data.per_page,
                    total: data.total,
                });
            })
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>Auditoria</h2>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuário</th>
                            <th>Evento</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    {loading && 
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center common-text">
                                    <span>Carregando...</span>
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!loading && 
                        <tbody>
                            {audits.map(audits => {
                                return (
                                    <tr key={audits.id}>
                                        <td>{audits.id}</td>
                                        <td>{audits.user}</td>
                                        <td>{audits.event}</td>
                                        <td>{audits.date}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    }
                    {!audits.length && !loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center common-text">
                                    <span>Nenhuma obra encontrada.</span>
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
            <div className="pagination mt-3 flex justify-center text-center">
                <button onClick={() => fetchAudits(pagination.currentPage - 1)} disabled={pagination.currentPage === 1} className="page-arrows">&laquo;</button>
                <button onClick={() => fetchAudits(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.lastPage} className="page-arrows">&raquo;</button>
            </div>
        </div>
    );
}