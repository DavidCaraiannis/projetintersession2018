import React, { Component } from 'react';
import {
    Dimmer,
    Form,
    Grid,
    Header,
    Loader,
    Message,
    Segment} from 'semantic-ui-react';
import { Button, Input } from 'mdbreact';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import ReeValidate from 'ree-validate';
import AuthService from '../../services';

class Page extends Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            email: 'required|email',
            password: 'required|min:6'
        });

        this.state = {
            credentials: {
                email: '',
                password: ''
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
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
        this.props.dispatch(AuthService.login(credentials))
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

    componentDidMount(){
        this.setState({
            isLoading: false
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            return (
                <Redirect to={from}/>
            )
        }
        const {errors} = this.state;

        return (
            <div className="login-account">
                <Segment className='page-loader' style={{display: this.state.isLoading ? 'block' : 'none'}}>
                    <Dimmer active inverted>
                        <Loader size='large'>Authenticating...</Loader>
                    </Dimmer>
                </Segment>

                <Grid
                    textAlign='center'
                    verticalAlign='middle'
                    className='login-form'
                >
                    <Grid.Column  style={{maxWidth: '450px'}}>
                        <Header id='title-login' as='h2' textAlign='center'>
                            <span>Login</span> to your account
                        </Header>
                        {this.state.responseError.isError && <Message negative>
                            <Message.Content>
                                {this.state.responseError.text}
                            </Message.Content>
                        </Message>}
                        <Form size='large'>
                            <Segment stacked>
                                <Input
                                    className="mail-login"
                                    icon='user'
                                    iconposition='left'
                                    name="email"
                                    label='email'
                                    containerClass="icon-position"
                                    onChange={this.handleChange}
                                    error={errors.has('email')}
                                />
                                {/* error message for wrong mail  */}
                                {errors.has('email') && <Header
                                    id='errorMailMsg'
                                    size='tiny'
                                    className='custom-error'
                                    color='blue'>
                                    {errors.first('email')}
                                </Header>}

                                <Input
                                    className="pass-login"
                                    icon='lock'
                                    iconposition='left'
                                    name="password"
                                    label='password'
                                    type='password'
                                    containerClass="icon-position"
                                    onChange={this.handleChange}
                                    error={errors.has('password')}
                                />
                                {/* error message for wrong password */}
                                {errors.has('password') && <Header
                                    id='errorPassMsg'
                                    size='tiny'
                                    className='custom-error'
                                    color='blue'>
                                    {errors.first('password')}
                                </Header>}

                                <Button id='login-page-button' color='elegant' size='md' style={style} onClick={this.handleSubmit}>Login</Button>
                                <Link id='link-forgot-pass' to='/forgot-password' replace>Forgot your password?</Link>
                                <div className="ui divider"></div>
                            </Segment>
                        </Form>
                        <Message id='new-to-us'>
                            New to us ?&nbsp; <Link to='/register' replace> Register</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

const style={
    borderRadius: 15,
    'backgroundImage':'linear-gradient(60deg, lightblue, darkblue)'

};

Page.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default Page;
