import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {getChannels} from '../../services/channels-api';
import {Channels} from './Channels';

export const ChannelsContainer = () => {
    const {channelId}             = useParams();
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        getChannels().then(channels => {
            setChannels(channels);
        });
    }, []);

    return <Channels channels={channels} activeId={Number(channelId)}/>;
};
