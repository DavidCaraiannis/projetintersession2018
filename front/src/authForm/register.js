import React, { Component }from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButtonfrom from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:'',
            surname:'',
            email:'',
            password:'',
            verify_password:''
        }
    }
    handleClick(event) {
        var apiBaseUrl = "http://localhost:5000/api/";

        console.log("values", this.state.name, this.state.surname, this.state.email, this.state.password, this.name.verify_password);
        var self = this;
        var payload={
            "name": this.state.name,
            "surname": this.state.surname,
            "email": this.state.email,
            "password": this.state.password,
            "verify_password": this.state.verify_password
        }
        axios.post(apiBaseUrl+'/register', payload)
            .then(function(response) {
                console.log(response);
                if(response.data.code == 200){
                //console.log("registration successfull");
                let loginScreen = [];
                loginScreen.push(<Login parentContext={this}/>);
                let loginMessage = "Pas encore enregistré ? Allez donc à l'enregistrement";
                self.props.parentContext.setState({
                    loginScreen:loginScreen,
                    loginMessage:loginMessage,
                    buttonLabel:"Register",
                    isLogin: true
                });
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    }


    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <TextField
                            hintText="Entrez votre Prénom"
                            floatingLabelText="Prénom"
                            onChange={(event,newValue) => this.setState({name:newValue})}
                        />
                        <br/>
                        <TextField
                            hindText="Entrez votre Nom"
                            floatingLabelText="Nom"
                            onChange={(event,newValue) => this.setState({surname:newValue})}
                        />
                        <br/>
                        <TextField
                            hindText="Entrez votre email"
                            floatingLabelText="Email"
                            onChange={(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hindText="Entrez votre mot de passe"
                            floatingLabelText="password"
                            onChange={(event,newvalue) => this.setState({password:newValue})}
                        />
                        <TextField
                            type="password"
                            hindText="Entre une nouvelle fois votre mot de passe"
                            floatingLabelText="password"
                            onChange={(event,newValue) => this.setState({verify_password:newValue})}
                        />
                        <RaisedButton label="Submit" primary={true} tyle={tyle} onclick{(event) => his.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    const style ={
        margin: 15,
    };

    export default Register;
}
