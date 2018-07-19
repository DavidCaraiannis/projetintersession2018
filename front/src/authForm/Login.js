import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/muiThemeable';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import ProjectPage from '../projectPage';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }

    handleClick(event) {
        const apiBaseUrl = "http://localhost:5000/api/";
        let self = this;
        let payload = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post(apiBaseUrl+'login', payload)
            .then(function (response) {
                console.log(response);
                if (response.data.code == 200){
                    console.log("Login successful");
                    let projectPage=[];
                    projectPage.push(<ProjectPage appContext={self.props.appContext}/>);
                    self.props.setState({loginPage:[], projectPage:projectPage})
                } else if (response.data.code == 204) {
                    console.log("Email password do not match");
                    alert("email password do not match")
                } else {
                    console.log("Email does not exists");
                    alert("Email does not exist");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(){
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter Your Email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter Your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton
                            label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};
export default Login;