import { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export function Register() {
    const [name, setName] = useState("");
    const [picture, setPicture] = useState("");
    const [base64Image, setBase64Image] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleFileChange(event) {
        const file = event.target.files[0];
        setPicture(file);

        // Converte o arquivo em Base64
        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64Image(reader.result); // Salva a string Base64 no estado
        };
        reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados (Base64)
    };

    async function handleRegister(e) {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const response = await api.post("/users", { name, picture, email, password });
        
            localStorage.setItem("user", JSON.stringify({
                id: response.data.id,
                name: response.data.nome,
                email: email,
                picture: response.data.picture,
                token: response.data.token,
            }));

            if (!response || response.data.error === true)
                return alert("Erro ao realizar cadastro")
        
            navigate("/home");
        } catch (e) {
            alert(e.response?.data?.message || "Erro ao realizar cadastro");
        }
    }

    return (
        <div className="register-main">
            <h1>Registre-se</h1>
            <section className="body">
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <div className="file-input-container">
                        <label htmlFor="file-upload" className="custom-file-upload">
                            Escolher Imagem
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            name="arquivos"
                            className="btn btn-success"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
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
                    <button className="register-button" type="submit">
                        Criar
                    </button>
                </form>
                <div className="button-Login">
                    <Link to="/">Login</Link>
                    <Link to="/home">Home</Link>
                </div>
            </section>
        </div>
    );
}
