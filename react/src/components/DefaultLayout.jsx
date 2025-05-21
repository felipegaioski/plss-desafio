import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import axiosClient from "../api/axios-client.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function DefaultLayout() {
    const { user, token, notification, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post('/logout').then(() => {
            setUser({});
            setToken(null);
        });
    }

    useEffect(() => {
        axiosClient.get('/user').then(({ data }) => {
            setUser(data);
        }).catch(() => { });
    }, []);

    const navigate = useNavigate();

    return (
        <div id="defaultLayout">
            <aside>
                <div className="top-content">
                    <div className="logo mb-3 d-flex align-items-center gap-2">
                        <img src="/plss.png" alt="" width="40" height="40"/>
                        <h1>PLSS</h1>
                    </div>
                    <div className="user mb-3">
                        {user.name}
                    </div>
                    <hr />
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/users">Usuários</Link>
                    <Link to="/constructions">Obras</Link>
                    <Link to="/audits">Auditoria</Link>
                </div>
                <div className="bottom-content">
                    <a className="btn-logout" href="#" onClick={onLogout}>Sair</a>
                </div>
            </aside>
            <div className="content">
                <header>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            onClick={() => navigate(-1)}
                            aria-label="Voltar"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1.5rem',
                                color: 'inherit',
                                padding: 0,
                            }}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    </div>
                </header>

                <main>
                    <Outlet />
                </main>
            </div>
            {notification &&
                <div className="notification animated fadeInDown">
                    {notification}
                </div>
            }
        </div>
    );
}