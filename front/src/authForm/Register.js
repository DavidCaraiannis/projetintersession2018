import React, { Component }from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Button, Input, Container, Modal, Card, CardBody, CardTitle, CardText } from 'mdbreact';
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
        const apiBaseUrl = "http://localhost:5000/api/";

        console.log("values", this.state.name, this.state.surname, this.state.email, this.state.password, this.name.verify_password);
        let self = this;
        let payload={
            "name": this.state.name,
            "surname": this.state.surname,
            "email": this.state.email,
            "password": this.state.password,
            "verify_password": this.state.verify_password
        };
        axios.post(apiBaseUrl+'/Register', payload)
            .then(function(response) {
                console.log(response);
                if(response.data.code === 200){
                //console.log("registration successfull");
                let loginScreen = [];
                loginScreen.push(<Login parentContext={this}/>);
                let loginMessage = "Not registered yet ? Go to register";
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
            <Card class="cardRegister">
                <CardBody>
                    <CardTitle> Register </CardTitle>
                    <CardText>
                        <div class="cardLoginScreen">
                            <Input
                                label="Name"
                                containerClass="active-cyan-2 mt-5 mb-3"
                                onChange={(event,newValue) => this.setState({name:newValue})}
                            />
                            <br/>
                            <Input
                                label="Surname"
                                containerClass="active-cyan-2 mt-0 mb-3"
                                onChange={(event,newValue) => this.setState({surname:newValue})}
                            />
                            <br/>
                            <Input
                                label="Email"
                                containerClass="active-cyan-2 mt-0 mb-3"
                                onChange={(event,newValue) => this.setState({email:newValue})}
                            />
                            <br/>
                            <Input
                                type="Password"
                                label="Password"
                                containerClass="active-cyan-2 mt-0 mb-3"
                                onChange={(event,newValue) => this.setState({password:newValue})}
                            />
                            <br/>
                            <Input
                                label="Confirm Your Password"
                                containerClass="active-cyan-2 mt-0 mb-3"
                                onChange={(event,newValue) => this.setState({verify_password:newValue})}
                            />
                            <br/>
                            <Button
                                color="elegant"
                                size="md"
                                label="Submit"
                                primary={true}
                                style={style}
                                onClick={(event) => this.handleClick(event)}
                            >Submit</Button>
                        </div>
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}

const style ={
    margin: 15,
    borderRadius: 15,
    'background-image':'linear-gradient(60deg, lightblue, darkblue)'
};

export default Register;
