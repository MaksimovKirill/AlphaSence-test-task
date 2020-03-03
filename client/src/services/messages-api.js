import axios from 'axios';

export const getMessages = channelId => {
    // TODO: move to config
    return axios.get(`http://localhost:3010/channels/${channelId}`)
        .then(res => res.data);
};

export const createMessage = (channelId, text) => {
    return axios.post(`http://localhost:3010/channels/${channelId}`, {text})
        .then(res => res.data);
};
