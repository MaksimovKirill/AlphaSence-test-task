import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {ChannelsContainer} from './components/channels/ChannelsContainer';
import {MessagesContainer} from './components/messages/MessagesContainer';
import {Welcome} from './components/welcome/Welcome';

function App() {
    return (
        <Router>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <Route path="/" exact component={ChannelsContainer} />
                        <Route path="/channels/:channelId" component={ChannelsContainer} />
                    </div>
                    <div className="col-md-8">
                        <Route path="/" exact component={Welcome}/>
                        <Route path="/channels/:channelId" component={MessagesContainer}/>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
