import "./styles.css";
import { Link } from "react-router";
import api from "../../services/api";
import { useEffect, useState } from "react";
import IMessage from "../../components/i-message";
import UserMessage from "../../components/user-message";

export function Home() {
    const [conversations, setConversations] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(conversations[0] || null);
    const [showMembers, setShowMembers] = useState(false); // Controla a exibição
    const [sendMessage, setSendMessage] = useState("");

    // async function handleHistoryPrivateMessages() {
    //     try {
    //         const user1Id=1;
    //         const user2Id=2;
    //         const { data } = await api.get(`/chat/history?sender${user1Id}&recipient=${user2Id}`);
    //         if (!data || data.error === true) alert("Serviço indisponível");
    //     } catch (e) {
    //         alert("Erro ao obter mensagens");
    //     }
    // };

    async function handleSendMessage() {
        if (!sendMessage.trim()) {
            alert("Digite uma mensagem antes de enviar.");
            return;
        }

        // pegar IDs do jwt e destinatário e não estático
        const senderId = 1;
        const recipientId = 2

        try {
            const { data } = await api.post("/chat/send", { senderId: senderId, recipientId: recipientId, content: sendMessage });
            if (!data || data.error === true) return alert("Mensagem não enviada");
            setSendMessage("");
        } catch (e) {
            alert(e);
        }
    };

    async function handleSendMessageGroup() {
        if (!sendMessage.trim()) {
            alert("Digite uma mensagem antes de enviar");
            return;
        };
    
        try {
            const { data } = await api.post(`/room/sendMessage?roomId=${selectedRoom?.id}`,
                { 
                    content: sendMessage, 
                    senderId: 4
                }
            );
            console.log("Mensagem enviada: ", data);
            if (!data || data.error === true) return alert("Mensagem não enviada");
            setSendMessage("");
        } catch (e) {
            alert(e);
        }
    };

    async function handleConversations() {
        try {
            const { data } = await api.get("/room");

            if (!data || data.error) return alert("Erro ao buscar conversas");

            const conversationsData = data.map(room => ({
                id: room.id,
                name: room.name || "Sala sem nome",
                members: room.members || []
            }));

            setConversations(conversationsData);
            setSelectedRoom(conversationsData[0] || null);
            localStorage.setItem('conversations', JSON.stringify(conversationsData));
        } catch (error) {
            alert("Erro ao conectar com o servidor");
            setConversations([]); // Garante que o estado seja resetado em caso de erro
        }
    };

    useEffect(() => {
        const storedConversations = localStorage.getItem('conversations');
        if (storedConversations) {
            const parsedConversations = JSON.parse(storedConversations);
            setConversations(parsedConversations);
            setSelectedRoom(parsedConversations[0] || null);
        } else {
            handleConversations(); // Carrega do backend se não houver localStorage
        }
    }, []);

    return (
        <div className="main">
            <div className="groups">
                <input placeholder="Pesquisar" type="text" />
                {conversations.map((conversation) => (
                    <button
                        key={conversation.id}
                        className={`message ${selectedRoom.id === conversation.id ? "active" : ""}`}
                        onClick={() => {
                            setSelectedRoom(conversation);
                            setShowMembers(false); // Redefine para conversa ao mudar de sala
                        }}
                    >
                        <div className="icon-conversation"></div>
                        {conversation.name}
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
                    {selectedRoom && <h2>{selectedRoom.name}</h2>}
                </header>
                <div className="chat-area">
                    {showMembers ? (
                        <div className="members" /*Exibe os membros da sala*/> 
                            <h3>Membros</h3>
                            {selectedRoom?.members?.length > 0 ? (
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
                            {conversations[0]?.members?.length > 0 ? (
                                <>
                                    <UserMessage
                                        selectedRoom={selectedRoom}
                                        members={conversations[0].members}
                                        picture={conversations[0].members[0]?.picture || "https://via.placeholder.com/50"}
                                    />
                                    <IMessage
                                        selectedRoom={selectedRoom}
                                        members={conversations[0].members}
                                        picture={conversations[0].members[0]?.picture || "https://via.placeholder.com/50"}
                                    />
                                    <UserMessage
                                        selectedRoom={selectedRoom}
                                        members={conversations[0].members}
                                        picture={conversations[0].members[0]?.picture || "https://via.placeholder.com/50"}
                                    />
                                </>
                            ) : (
                                <p className="no-conversation">Nenhuma conversa disponível</p>
                            )}
                        </div>
                    )}
                </div>
                <div className="message-input">
                    <input
                        type="text"
                        placeholder="Digite sua mensagem..."
                        className="input-message"
                        value={sendMessage}
                        onChange={(e) => setSendMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessageGroup}
                    />
                    <button
                        className="send-button"
                        onClick={handleSendMessageGroup}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}