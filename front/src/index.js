import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import store from './store';
import Routes from './routes';
import * as action from './store/actions';
import registerServiceWorker from './registerServiceWorker';
import CardExample from './project/project';

store.dispatch(action.authCheck());

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();