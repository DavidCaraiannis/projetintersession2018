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
            //password_confirmation: 'required|min:6|confirmed:password'
        });
        this.state = {
            credentials: {
                name: '',
                surname: '',
                email: '',
                password: '',
                //password_confirmation: ''
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
                } else {
                    console.log('error');
                    alert('error');
                }
            })
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
            <div className='register-account'>
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
                        <Header id='title-register' as='h2' textAlign='center'>
                            <span>Register</span> for new account
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
                                    iconposition='left'
                                    name="name"
                                    label='Name'
                                    containerClass="active-cyan-2 mt-0 mb-4 icon-position"
                                    onChange={this.handleChange}
                                />
                                {errors.has('name') &&
                                <Header id='errorNameMsg' size='tiny' className='custom-error' color=''>
                                    {errors.first('name')}
                                </Header>}

                                <Input
                                    icon='user'
                                    iconposition='left'
                                    name="surname"
                                    label='Surname'
                                    containerClass="active-cyan-2 mt-0 mb-4 icon-position"
                                    onChange={this.handleChange}
                                />
                                {errors.has('surname') &&
                                <Header id='errorSurnameMsg' size='tiny' className='custom-error' color=''>
                                    {errors.first('surname')}
                                </Header>}

                                <Input
                                    icon='envelope'
                                    iconposition='left'
                                    name="email"
                                    label='Email'
                                    containerClass="active-cyan-2 mt-0 mb-4 icon-position"
                                    onChange={this.handleChange}
                                />
                                {errors.has('email') &&
                                <Header id='errorMailMsg' size='tiny' className='custom-error' color=''>
                                    {errors.first('email')}
                                </Header>}

                                <Input
                                    icon='lock'
                                    iconposition='left'
                                    name="password"
                                    label='Password'
                                    type='password'
                                    containerClass="active-cyan-2 mt-0 mb-4 icon-position"
                                    onChange={this.handleChange}
                                />
                                {errors.has('password') &&
                                <Header id='errorPassMsg' size='tiny' className='custom-error' color=''>
                                    {errors.first('password')}
                                </Header>}

                                <Button id='register-page-button' color='elegant' size='md' style={style} onClick={this.handleSubmit}>Register</Button>

                            </Segment>
                        </Form>
                        <Message id='already-register'>
                            Already register ?&nbsp; <Link to='/login' replace>Login</Link>
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

/*<Input
    icon='refresh'
    iconposition='left'
    name="password"
    label='Confirm your password'
    type='password'
    containerClass="active-cyan-2 mt-0 mb-4 icon-position"
    onChange={this.handleChange}
/>
{errors.has('password_confirmation') &&
<Header id='errorPassConfirmMsg' size='tiny' className='custom-error' color=''>
    {errors.first('password_confirmation')}
</Header>}*/