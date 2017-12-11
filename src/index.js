import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const element = React.createElement('h1', { className: 'greeting' }, 'Hello, ten World');
ReactDOM.render(element, document.getElementById('root'));
registerServiceWorker();

