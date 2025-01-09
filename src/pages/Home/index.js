import "./styles.css";
import { Link } from "react-router";
import api from "../../services/api";
import { useEffect, useState } from "react";

export function Home() {
    const [conversations, setConversations] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [showMembers, setShowMembers] = useState(false);
    const [sendMessage, setSendMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

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

    // async function handleSendMessage() {
    //     if (!sendMessage.trim()) {
    //         alert("Digite uma mensagem antes de enviar.");
    //         return;
    //     }

    //     // pegar IDs do jwt e destinatário e não estático
    //     const senderId = 1;
    //     const recipientId = 2

    //     try {
    //         const { data } = await api.post("/chat/send", { senderId: senderId, recipientId: recipientId, content: sendMessage });
    //         if (!data || data.error === true) return alert("Mensagem não enviada");
    //         setSendMessage("");
    //     } catch (e) {
    //         alert(e);
    //     }
    // };

    async function handleSendMessageGroup() {
        if (!sendMessage.trim()) {
            alert("Digite uma mensagem antes de enviar");
            return;
        };

        try {
            // const { user } = JSON.parse(localStorage.getItem("user"));
            console.log("ID: ", currentUser.id);
            const { data } = await api.post(`/room/sendMessage?roomId=${selectedRoom?.id}`,
                {
                    content: sendMessage,
                    senderId: currentUser.id
                }
            );
            console.log("Mensagem enviada: ", data);
            if (!data || data.error === true) return alert("Mensagem não enviada");
            setSendMessage("");
        } catch (e) {
            alert(e);
        }
    };

    // Função para buscar histórico de mensagens
    const fetchRoomMessages = async (roomId) => {
        if (!roomId) return;

        setLoadingMessages(true);
        try {
            const { data } = await api.get(`/room/historyMembers?roomId=${roomId}`);
            console.log("Histórico de mensagens: ", data)
            setMessages(data);
        } catch (error) {
            alert("Erro ao carregar mensagens.");
        } finally {
            setLoadingMessages(false);
        }
    };

    // Função para buscar conversas disponíveis
    const handleConversations = async () => {
        try {
            const { data } = await api.get("/room");
            console.log("Conversas: ", data);

            if (!data || data.error) return alert("Erro ao buscar conversas");

            const conversationsData = data.map((room) => ({
                id: room.id,
                name: room.name || "Sala sem nome",
                members: room.members || []
            }));

            setConversations(conversationsData);
            setSelectedRoom(conversationsData[0] || null);
            localStorage.setItem("conversations", JSON.stringify(conversationsData));
        } catch (error) {
            alert("Erro ao conectar com o servidor");
            setConversations([]); // Reseta o estado em caso de erro
        }
    };

    useEffect(() => {
        const storedConversations = localStorage.getItem("conversations");
        if (storedConversations) {
            const parsedConversations = JSON.parse(storedConversations);
            setConversations(parsedConversations);
            setSelectedRoom(parsedConversations[0] || null);
        } else {
            handleConversations(); // Carrega do backend se não houver localStorage
        }
    }, []);

    useEffect(() => {
        if (selectedRoom) {
            fetchRoomMessages(selectedRoom.id);
        }
    }, [selectedRoom]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setCurrentUser(parsedUser.user); // Define o estado com os dados do usuário
        }
    }, []);

    return (
        <div className="main">
            <div className="groups">
                <input placeholder="Pesquisar" type="text" />
                {console.log(conversations, currentUser)}
                {conversations.map((conversation) => (
                    <button
                        key={conversation.id}
                        className={`message ${selectedRoom?.id === conversation.id ? "active" : ""}`}
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
                        <div className="chat">
                            {loadingMessages ? (
                                <p>Carregando mensagens...</p>
                            ) : messages.length > 0 ? (
                                messages.map((message) => {
                                    const isLoggedUser = message.sender.id === currentUser.id;

                                    return (
                                        <div
                                            key={message.id}
                                            className={`user-message ${isLoggedUser ? "user-right" : "user-left"}`}
                                        >
                                            {!isLoggedUser && (
                                                <img
                                                    src={message.sender.picture}
                                                    alt={message.sender.name}
                                                    className="user-picture"
                                                />
                                            )}
                                            <p>
                                                <strong>{message.sender.name}:</strong> {message.content}
                                            </p>
                                            <small>{new Date(message.createdAt).toLocaleString()}</small>
                                        </div>
                                    );
                                })
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
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessageGroup()}
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
