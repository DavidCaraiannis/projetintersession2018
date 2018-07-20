import React, { Component }from 'react';
//import { Button, Input, Container, Modal, Card, CardBody, CardTitle, CardText } from 'mdbreact';
import {Button, Dimmer, Form, Grid, Header, Loader, Message, Segment} from 'semantic-ui-react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import ReeValidate from 'ree-validate';
import AuthService from '../../services';
import PageHeader from '../../common/pageHeader';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            name: 'required|min:3',
            surname: 'required|min:2',
            email: 'required|email',
            password: 'required|min:6',
            password_confirmation: 'required|min:6|confirmed:password'
        });
        this.state = {
            credentials: {
                name: '',
                surname: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            isSuccess: false,
            isLoading: false,
            errors: this.validator.errors
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const { errors } = this.validator;
        const {credentials} = this.state;
        credentials[name] = value;

        this.validator.validate(name, value)
            .then(() => {
                this.setState({errors, credentials})
            });
    }

    handleSubmit(event) {
        event.preventDefault();

        const {credentials} = this.state;

        this.validator.validateAll(credentials)
            .then(success => {
                if (success) {
                    this.setState({
                        isLoading: true
                    });
                    this.submit(credentials);
                }
            });
    }

    submit(credentials) {
        this.props.dispatch(AuthService.register(credentials))
            .then((result)  => {
                this.setState({
                    isLoading: false
                });
                this.setState({
                    isSuccess: true,
                });
            })
            .catch(({error, statusCode}) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };
                this.setState({responseError});
                this.setState({
                    isLoading: false
                });
            })
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/' replace/>
        }
        const {errors} = this.state;
        return (
            <div>
                <PageHeader heading="Register"/>
                <Segment className='page-loader' style={{display: this.state.isLoading ? 'block' : 'none'}}>
                    <Dimmer active inverted>
                        <Loader size='large'>Registering...</Loader>
                    </Dimmer>
                </Segment>

                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    className='login-form'
                >
                    <Grid.Column style={{maxWidth: '450px'}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Register for new account
                        </Header>
                        {this.state.responseError.isError && <Message negative>
                            <Message.Content>
                                {this.state.responseError.text}
                            </Message.Content>
                        </Message>}
                        {this.state.isSuccess && <Message positive>
                            <Message.Content>
                                Registered Successfully ! <Link to='/login' replace>Login</Link> here
                            </Message.Content>
                        </Message>}
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    name='name'
                                    placeholder='Name'
                                    onChange={this.handleChange}
                                />
                                {errors.has('name') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('name')}
                                </Header>}
                                <Form.Input
                                    fluid
                                    icon='mail'
                                    iconPosition='left'
                                    name='email'
                                    placeholder='E-mail address'
                                    onChange={this.handleChange}
                                />
                                {errors.has('email') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('email')}
                                </Header>}
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    name='password'
                                    placeholder='Password'
                                    type='password'
                                    onChange={this.handleChange}
                                />
                                {errors.has('password') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('password')}
                                </Header>}
                                <Form.Input
                                    fluid
                                    icon='refresh'
                                    iconPosition='left'
                                    name='password_confirmation'
                                    placeholder='Confirm password'
                                    type='password'
                                    onChange={this.handleChange}
                                />
                                {errors.has('password_confirmation') &&
                                <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('password_confirmation')}
                                </Header>}
                                <Button color='teal' fluid size='large' onClick={this.handleSubmit}>Register</Button>
                            </Segment>
                        </Form>
                        <Message>
                            Already register ? <Link to='/login' replace>Login</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

    /*handleClick(event) {
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
                //console.log("registration successful");
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
    }*/

/*
    render() {
        return (
            <Card className="cardRegister">
                <CardBody>
                    <CardTitle> Register </CardTitle>
                    <CardText>
                        <div className="cardLoginScreen">
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
    }*/
}

const style ={
    margin: 15,
    borderRadius: 15,
    'background-image':'linear-gradient(60deg, lightblue, darkblue)'
};

Register.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default Register;
