import { useState } from "react";
import { Link } from "react-router";
import IMessage from "../../components/i-message";
import UserMessage from "../../components/user-message";

// import api from '../../services/api';
import "./styles.css";

export function Home() {
    const [messages, setMessages] = useState([
        {
            id: "01057a91-48a2-46b0-a1c4-50cc04bc3ed1",
            name: "Sala 3",
            members: [
                {
                    id: 10,
                    name: "Wellington Carvalho",
                    picture: "https://img.myloview.com.br/posters/user-icon-vector-people-icon-profile-vector-icon-person-illustration-business-user-icon-users-group-symbol-male-user-symbol-700-223068865.jpg",
                    isOnline: false,
                },
                {
                    id: 11,
                    name: "Gleice Ellen",
                    picture: "https://img.myloview.com.br/posters/user-icon-vector-people-icon-profile-vector-icon-person-illustration-business-user-icon-users-group-symbol-male-user-symbol-700-223068865.jpg",
                    isOnline: false,
                },
                {
                    id: 12,
                    name: "Tiago Vinicius Manoel Mendes",
                    picture: "https://img.myloview.com.br/posters/user-icon-vector-people-icon-profile-vector-icon-person-illustration-business-user-icon-users-group-symbol-male-user-symbol-700-223068865.jpg",
                    isOnline: true,
                },
            ],
        },
        {
            id: "75c566f0-494a-4241-b636-995354a44635",
            name: "Sala 1",
            members: [],
        },
        {
            id: "fc0fbce0-3521-4116-b40a-aeaefd789f68",
            name: "Sala 2",
            members: [],
        },
    ]);

    const [selectedRoom, setSelectedRoom] = useState(messages[0]);
    const [showMembers, setShowMembers] = useState(false); // Controla a exibição

    return (
        <div className="main">
            <div className="groups">
                <input placeholder="Pesquisar" type="text" />
                {messages.map((message) => (
                    <button
                        key={message.id}
                        className={`message ${selectedRoom.id === message.id ? "active" : ""}`}
                        onClick={() => {
                            setSelectedRoom(message);
                            setShowMembers(false); // Redefine para conversa ao mudar de sala
                        }}
                    >
                        <div className="icon-conversation"></div>
                        {message.name}
                    </button>
                ))}
                <Link to="/">Sair</Link>
            </div>
            <div className="content">
                <header
                    className="cabecalho"
                    onClick={() => setShowMembers(!showMembers)} // Alterna a exibição
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/615/615075.png"
                        alt="group"
                    />
                    <h2>{selectedRoom.name}</h2>
                </header>
                <div className="chat-area">
                    {showMembers ? (
                        // Exibe os membros da sala
                        <div className="members">
                            <h3>Membros</h3>
                            {selectedRoom.members.length > 0 ? (
                                selectedRoom.members.map((member) => (
                                    <div key={member.id} className="member">
                                        <img src={member.picture} alt={member.name} />
                                        <div>
                                            <p>{member.name}</p>
                                            <span
                                                className={`status ${member.isOnline ? "online" : "offline"}`}
                                            >
                                                {member.isOnline ? "Online" : "Offline"}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-members">Nenhum membro na sala</p>
                            )}
                        </div>
                    ) : (
                        // Exibe a conversa
                        <div className="chat">
                            <UserMessage members={messages[0].members} picture={messages[0].members[0].picture}/>
                            <IMessage members={messages[0].members} picture={messages[0].members[0].picture}/>
                            <UserMessage members={messages[0].members} picture={messages[0].members[0].picture}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}