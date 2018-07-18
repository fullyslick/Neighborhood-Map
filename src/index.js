import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerMyServiceWorker from './regitserMyServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerMyServiceWorker();
