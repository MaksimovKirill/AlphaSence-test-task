import React, {useCallback, useState} from 'react';
import {Input} from './Input';
import {createMessage} from '../../../services/messages-api';

export const InputContainer = ({channelId, onMessageAdded}) => {
    const [text, setText] = useState('');

    const onChange = useCallback((e) => {
       setText(e.target.value);
    }, []);

    const onSubmit = useCallback((e) => {
        e.preventDefault();

        createMessage(channelId, text).then(message => {
            setText('');
            onMessageAdded(message);
        });
    }, [channelId, text]);

    return (
        <Input onSubmit={onSubmit} onChange={onChange} text={text}/>
    );
};
