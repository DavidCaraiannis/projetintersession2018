import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Main from './Main';
import store from './store';
import Routes from './routes';
import * as action from './store/actions';
//import LoginScreen from './pages/authForm/LoginScreen';
import registerServiceWorker from './registerServiceWorker';

store.dispatch(action.authCheck());

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();