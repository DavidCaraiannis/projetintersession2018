import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Button } from 'mdbreact';

import Logo from './Nick-logo.svg';

import Login from './Login';
import Register from './Register';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:'',
            password:'',
            loginScreen:[],
            loginMessage:'',
            buttonLabel:'Register',
            isLogin: true
        }
    }

    componentWillMount() {
        let loginScreen = [];
        loginScreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
        const loginMessage = "Not Registered yet, Register now";
        this.setState({
            loginScreen: loginScreen,
            loginMessage: loginMessage
        })
    }

    handleClick(event){
        //console.log("event", event)
        let loginMessage;
        if (this.state.isLogin) {
            let loginScreen = [];
            loginScreen.push(<Register parentContext={this}/>);
            loginMessage = "Already registered. Go to";
            this.setState({
                loginScreen:loginScreen,
                loginMessage: loginMessage,
                buttonLabel:"Login",
                isLogin:false
            })
        } else {
            let loginScreen = [];
            loginScreen.push(<Login parentContext={this}/>);
            loginMessage = "Not registered yet. Go to registration";
            this.setState({
                loginScreen:loginScreen,
                loginMessage: loginMessage,
                buttonLabel:"Register",
                isLogin: true
            })
        }
    }

    render() {
        return [
            <div className="loginscreen">
                <img id="logo" alt="logo" src={Logo}></img>
                {this.state.loginScreen}
                <div>
                    {this.state.loginMessage}
                        <div>
                            <Button
                                color="elegant"
                                size="sm"
                                label="Register"
                                primary={true}
                                style={style}
                                onClick={(event) => this.handleClick(event)}
                            >Register</Button>
                            <Button
                                color="elegant"
                                size="sm"
                                label="login"
                                primary={true}
                                style={style}
                                onClick={(event) => this.handleClick(event)}
                            >Login</Button>
                        </div>
                </div>
            </div>
        ];
    }
}

const style = {
    margin: 15,
};

export default LoginScreen;
