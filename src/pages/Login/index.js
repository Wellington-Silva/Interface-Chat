import "./style.css";
import { useState } from "react";
import api from '../../services/api';
import { Link, useNavigate } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await api.post('/users/signin', { email, password });

            localStorage.setItem('user', JSON.stringify({
                id: response.data.id,
                name: response.data.name,
                email: email,
                picture: response.data.picture,
                token: response.data.token
            }));

            if (!response || response.data.error === true) return alert("Erro ao realizar login");

            navigate('/home');
        } catch (error) {
            alert('Erro no login, tente novamente.');
        }
    };

    return (
        <div className="container-log">
            <h1>Faça seu login</h1>
            <div className="login-container">
                <section className="formulario">
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="button" type="submit">
                            Entrar
                        </button>
                    </form>
                    <div className="container-button">
                        <Link to="/register">Registrar-se</Link>
                        <Link to="/home">Home</Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
