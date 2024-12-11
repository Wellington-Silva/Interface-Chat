import { useState } from "react";
import { Link } from "react-router-dom";

// import api from '../../services/api';
import "./styles.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  /* 
  const dados = {login, senha};
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('usuario/autenticar', dados);
            
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('userName', response.data.nome);
            localStorage.setItem('userLogin', login);
            localStorage.setItem('userEmail', response.data.email);
            localStorage.setItem('userData', response.data.data_nascimento);

            history.push('/perfil');
        } catch (error) {
            alert('Erro no login, tente novamente.');
        }
    }
  */

  return (
    <div className="container-log">
      <div className="login-container">
        <section className="formulario">
          <form /*onSubmit={handleLogin}*/>
            <h1>Faça seu login</h1>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </form>
          <div className="container-button">
            <button
              className="button" type="submit"
              onClick={() => alert("email: " + email + " Senha: " + senha)}
            >
              Entrar
            </button>
            <Link to="/cadastrar">Cadastrar</Link>
          </div>
        </section>
      </div>
    </div>
  );
}