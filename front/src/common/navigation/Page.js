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
                <Responsive as={Segment} inverted minWidth={769}>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-blue">
                        <Container>
                            <Menu.Item as={Link} to="/" replace>Home</Menu.Item>
                            <Menu.Item as={NavLink} to="/project">Project</Menu.Item>
                            <Menu.Item as={NavLink} to="/gantt">Gantt</Menu.Item>
                            <Menu.Menu>
                                {this.props.isAuthenticated
                                    ?<nav className='bounceIn animated'>
                                        <Menu.Item disabled key='user'>
                                            {"Signed in as " + this.props.userEmail}
                                        </Menu.Item>
                                        <Menu.Item onClick={this.handleLogout} icon='sign out'
                                                      key='logout'>Logout</Menu.Item>
                                    </nav>
                                    : <div>
                                        <Menu.Item as={Link} to="/login" replace
                                                style={{lineHeight: '2em', paddingRight: '2em'}}>Login</Menu.Item>
                                        <Menu.Item as={Link} to="/register" replace
                                                style={{lineHeight: '2em'}}>Register</Menu.Item>
                                    </div>
                                }
                            </Menu.Menu>
                        </Container>
                    </nav>
                </Responsive>
            </div>
        );
    }
}

Page.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default Page;
