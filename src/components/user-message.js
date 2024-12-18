import api from "../services/api";
import React, { useState, useEffect } from "react";

const UserMessage = ({ selectedRoom }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para buscar histórico de mensagens
    const fetchHistoryMessages = async () => {
        if (!selectedRoom || !selectedRoom.id) return;

        try {
            const { data } = await api.get(`/room/historyMembers?roomId=${selectedRoom.id}`);
            setMessages(data); // Atualiza o estado com as mensagens
        } catch (error) {
            alert("Erro ao buscar o histórico de mensagens.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistoryMessages();
    }, [selectedRoom]);

    return (
        <div className="messages-container">
            {loading ? (
                <p>Carregando mensagens...</p>
            ) : messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message.id} className="user-message">
                        <img
                            src={message.sender.picture}
                            alt={message.sender.name}
                            className="user-picture"
                        />
                        <p>
                            <strong>{message.sender.name}:</strong> {message.content}
                        </p>
                        <small>{new Date(message.createdAt).toLocaleString()}</small>
                    </div>
                ))
            ) : (
                <p>Nenhuma mensagem encontrada.</p>
            )}
        </div>
    );
};

export default UserMessage;
