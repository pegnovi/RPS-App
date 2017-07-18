import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import io from 'socket.io-client';

const socket = io('http://localhost:8090');


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
