import React, { Component } from 'react';
import {Dimmer, Form, Grid, Header, Loader, Message, Segment} from 'semantic-ui-react';
import { Button, Input } from 'mdbreact';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import ReeValidate from 'ree-validate';
import AuthService from '../../services';

class Page extends Component {
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
                                <Input
                                    icon='user'
                                    iconPosition='left'
                                    name="name"
                                    label='Name'
                                    containerClass="active-cyan-2 mt-2 mb-0"
                                    onChange={this.handleChange}
                                />
                                {errors.has('name') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('name')}
                                </Header>}
                                <Input
                                    icon='user'
                                    iconPosition='left'
                                    name="surname"
                                    label='Surname'
                                    containerClass="active-cyan-2 mt-2 mb-0"
                                    onChange={this.handleChange}
                                />
                                {errors.has('surname') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('surname')}
                                </Header>}
                                <Input
                                    icon='envelope'
                                    iconPosition='left'
                                    name="email"
                                    label='Email'
                                    containerClass="active-cyan-2 mt-2 mb-0"
                                    onChange={this.handleChange}
                                />
                                {errors.has('email') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('email')}
                                </Header>}
                                <Input
                                    icon='lock'
                                    iconPosition='left'
                                    name="password"
                                    label='Password'
                                    type='password'
                                    containerClass="active-cyan-2 mt-2 mb-0"
                                    onChange={this.handleChange}
                                />
                                {errors.has('password') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('password')}
                                </Header>}
                                <Input
                                    icon='refresh'
                                    iconPosition='left'
                                    name="password"
                                    label='Confirm your password'
                                    type='password'
                                    containerClass="active-cyan-2 mt-2 mb-0"
                                    onChange={this.handleChange}
                                />
                                {errors.has('password_confirmation') &&
                                <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('password_confirmation')}
                                </Header>}
                                <Button color='elegant' size='md' style={style} onClick={this.handleSubmit}>Register</Button>
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
}

const style ={
    margin: 15,
    borderRadius: 15,
    'backgroundImage':'linear-gradient(60deg, lightblue, darkblue)'
};

Page.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default Page;
