import React from 'react';
import './MessageList.css';

export const MessageList = ({messages}) => (
    <ul className="message-list">
        {messages.map(message => (
            <li className="message-list_item" key={message.id}>
                {message.text}
            </li>
        ))}
    </ul>
);
