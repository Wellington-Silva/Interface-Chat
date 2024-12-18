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

    // async function handleHistoryMessagesPrivates() {
    //     try {
    //         const user1Id=1;
    //         const user2Id=2;
    //         const response = await api.get(`/chat/history?sender${user1Id}&recipient=${user2Id}`);
    //         if (!response) alert("Serviço indisponível");
    //     } catch (e) {
    //         alert("Erro ao obter mensagens");
    //     }
    // };

    async function handleHistoryMessagesMembers() {
        // pegar ID da sala
        const roomId = "99ff6d8b-90a4-4532-9742-5060c3f0aa78";
        try {
            const { data } = await api.get(`/room/historyMembers?roomId=${roomId}`);
            console.log("Response: ", data);
            if (!data || data.error) alert("Serviço indisponível");
        } catch (e) {
            alert("Histórico não encontrado")
        }
    };

    async function handleSendMessage() {
        if (!sendMessage.trim()) {
            alert("Digite uma mensagem antes de enviar.");
            return;
        }
        console.log("Mensagem enviada:", sendMessage);

        // pegar IDs do jwt e destinatário e não estático
        const senderId = 1;
        const recipientId = 2

        try {
            const response = await api.post("/chat/send", { senderId: 1, recipientId: 2, content: sendMessage });
            if (!response || response.data.error === true) return alert("Mensagem não enviada");
            setSendMessage("");
        } catch (e) {
            alert(e)
        }
    };

    async function handleConversations() {
        try {
            const response = await api.get("/room");

            if (!response || response.data.error) return alert("Erro ao buscar conversas");

            const conversationsData = response.data.map(room => ({
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
    }

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
                <div className="chat-area" onClick={handleHistoryMessagesMembers}>
                    {showMembers ? (
                        // Exibe os membros da sala
                        <div className="members">
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
                                        members={conversations[0].members}
                                        picture={conversations[0].members[0]?.picture || "https://via.placeholder.com/50"}
                                    />
                                    <IMessage
                                        members={conversations[0].members}
                                        picture={conversations[0].members[0]?.picture || "https://via.placeholder.com/50"}
                                    />
                                    <UserMessage
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
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // Envia ao pressionar Enter
                    />
                    <button
                        className="send-button"
                        onClick={handleSendMessage}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}