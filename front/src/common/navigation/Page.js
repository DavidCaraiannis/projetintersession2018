import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Menu,
    Responsive,
    Segment
} from 'semantic-ui-react';
import { Container} from 'mdbreact'
import * as actions from '../../store/actions';


class Page extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.dispatch(actions.authLogout());
    }


    render() {
        return (
            <div>
                <Responsive as={Segment} inverted style={{marginBottom: '0', borderRadius: '0', padding: '1em 0em'}}
                            className="navbar" minWidth={769}>
                    <Menu inverted pointing secondary size='large'>
                        <Container>
                            <Menu.Item as={Link} to="/" replace>Home</Menu.Item>
                            <Menu.Item as={NavLink} to="/dashboard">Dashboard</Menu.Item>
                            <Menu.Menu position='right'>
                                {this.props.isAuthenticated
                                    ?<Menu className='bounceIn animated'>
                                        <Menu.Item disabled key='user'>
                                            {"Signed in as " + this.props.userEmail}
                                        </Menu.Item>
                                        <Menu.Item onClick={this.handleLogout} icon='sign out'
                                                      key='logout'>Logout</Menu.Item>
                                    </Menu>
                                    : <div>
                                        <Menu.Item as={Link} to="/login" replace
                                                style={{lineHeight: '2em'}}>Login</Menu.Item>
                                        <Menu.Item as={Link} to="/register" replace
                                                style={{lineHeight: '2em'}}>Register</Menu.Item>
                                    </div>
                                }
                            </Menu.Menu>
                        </Container>
                    </Menu>
                </Responsive>
            </div>
        );
    }
}

Page.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default Page;