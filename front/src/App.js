import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';


//import logo from './logo.svg';
import './App.css';
import LoginScreen from './authForm/LoginScreen';

injectTapEventPlugin();

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginPage:[],
            projectPage: []
        }
    }

    componentWillMount(){
        let loginPage = [];
        loginPage.push(<LoginScreen parentContext={this}/>);
        this.setState({
            loginPage:loginPage
        })
    }

    render() {
        return (
            <div className="App">
                {this.state.loginPage}
                {this.state.projectPage}
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default App;
