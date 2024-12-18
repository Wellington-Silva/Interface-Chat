import "./style.css";
import { useState } from "react";
import api from '../../services/api';
import { Link, useNavigate } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        // Reseta estado de erro
        setError("");

        if (!email || !password) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.post('/users/signin', { email, password });

            if (!data || data.error) {
                setError("Credenciais inválidas ou erro no servidor.");
                return;
            }

            const { userToken } = data;
            const token = userToken.token;
            const user = userToken.user;

            if (!token) {
                setError("Token de autenticação ausente. Tente novamente.");
                return;
            }

            localStorage.setItem('user', JSON.stringify({ user, token }));

            navigate('/home');
        } catch (err) {
            setError("Erro ao realizar login. Verifique sua conexão ou tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-log">
            <h1>Faça seu login</h1>
            <div className="login-container">
                <section className="formulario">
                    <form onSubmit={handleLogin}>
                        {error && <p className="error-message">{error}</p>}
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
                        <button
                            className="button"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Carregando..." : "Entrar"}
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
