import axios from 'axios';

export const getChannels = () => {
    return axios.get('http://localhost:3010/channels')
        .then(res => res.data);
};
