import React, {useCallback, useState, useEffect} from 'react';
import {useParams} from 'react-router';
import './MessagesContainer.css';
import {InputContainer} from './input/InputContainer';
import {MessageList} from './list/MessageList';
import {getMessages} from '../../services/messages-api';

export const MessagesContainer = () => {
    const {channelId}             = useParams();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages(channelId).then(messagesFromServer => {
            setMessages(messagesFromServer);
        });
    }, [channelId]);

    const onMessageAdded = useCallback((message) => {
        setMessages([...messages, message]);
    }, [messages]);

    return (
        <div>
            <h3>Messages</h3>
            <div className="messages_message-list">
                <MessageList messages={messages}/>
            </div>
            <div className="messages_message-input">
                <InputContainer channelId={channelId} onMessageAdded={onMessageAdded}/>
            </div>
        </div>
    )
};
