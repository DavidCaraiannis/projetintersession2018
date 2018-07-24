import React, { Component } from 'react';
import {
    Header,
    Responsive,
    Segment,
} from 'semantic-ui-react';
import { Container } from 'mdbreact';
import Logo from '../../logo.svg';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Segment
                    inverted
                    textAlign='center'
                    className='home-header cardLoginScreen'
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