import { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

export function Register() {
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    async function handleRegister(e) {
        e.preventDefault();

        if (!name || !picture || !email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
    };

    return (
        <div className="main" >
            <h1>Registre-se</h1>
            <section className="body">
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required>
                    </input>
                    <div class="file-input-container">
                        <label for="file-upload" class="custom-file-upload">
                            Escolher Imagem
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            name="arquivos"
                            class="btn btn-success"
                            accept="image/*"
                            multiple
                        />
                    </div>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required>
                    </input>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        required>
                    </input>
                </form>
                <button className="button" type="submit">
                    Criar
                </button>
                <div className="container-button">
                    <Link to="/">Login</Link>
                    <Link to="/home">Home</Link>
                </div>
            </section>
        </div>
    );
};