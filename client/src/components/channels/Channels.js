import React from 'react';
import {Link} from 'react-router-dom';
import * as classnames from 'classnames';
import './Channels.css';

export const Channels = ({channels, activeId})=> {

    return (
        <div>
            <h3>Channels</h3>
            <ul>
                {channels.map(channel => (
                    <li key={channel.id} className={classnames('channel_item', {channel_item__active: activeId && activeId === channel.id})}>
                        <Link to={`/channels/${channel.id}`}>{channel.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
