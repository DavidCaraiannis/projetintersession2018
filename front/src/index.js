import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CardExample from './project/project';

ReactDOM.render(<CardExample />, document.getElementById('root'));
registerServiceWorker();
