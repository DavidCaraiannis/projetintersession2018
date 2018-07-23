import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Header,
    Responsive,
    Segment,
} from 'semantic-ui-react';
import { Button, Container } from 'mdbreact';
import Logo from '../../logo.svg';
import AuthService from '../../services';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state= {
        }
    }

    componentDidMount() {
        const params = this.props.location.search;
        Button.defaultProps.disableRippleParent = true;
        Button.defaultProps.disableRippleParent = true;


        setTimeout(function() {

            if (params) {
                this.props.dispatch(AuthService.socialLogin({ params }))
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

        }.bind(this), 1000);
    }

    render() {
        return (
            <div>
                <Segment
                    inverted
                    textAlign='center'
                    className='home-header'
                    vertical
                >
                    <Container>
                        <Responsive minWidth={769}>
                            <Header
                                as="h2"
                                content="Welcome"
                                inverted
                                className="pretitle"
                            />
                            <img id="logo" alt="logo" src={Logo}></img>
                        </Responsive>
                    </Container>
                </Segment>
                <div className="course-tour">
                    <Container style={{padding: '2em 0em'}}>
                        <Header as="h3" content="About our company"/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Page;