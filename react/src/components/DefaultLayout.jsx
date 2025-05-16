import { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import axios from "axios";

export default function DefaultLayout() {
    const {user, token, setUser, setToken} = useStateContext();

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
        axiosClient.get('/user').then(({data}) => {
            setUser(data);
        }).catch(() => {});
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        { user.name }
                        <a className="btn-logout" href="#" onClick={onLogout}>Sair</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}