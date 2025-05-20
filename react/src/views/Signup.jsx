import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../api/axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [errors, setErrors] = useState(null);

    const {setUser, setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value
        };

        axiosClient.post('/signup', payload).then(({data}) => {
            setUser(data.user);
            setToken(data.token);
        }).catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
        })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Crie sua conta</h1>
                    { errors && (
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input ref={nameRef} type="text" placeholder="Nome completo"/>
                    <input ref={emailRef} type="email" placeholder="E-mail"/>
                    <input ref={passwordRef} type="password" placeholder="Senha"/>
                    <input ref={confirmPasswordRef} type="password" placeholder="Confirme a Senha"/>
                    <button type="submit" className="btn btn-block">Cadastrar</button>
                    <p className="message">Já possui uma conta?
                        <Link to="/login"> Faça Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}