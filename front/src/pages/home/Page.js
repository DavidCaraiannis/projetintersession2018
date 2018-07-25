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
            <div className="logo-HomePage">
                <Segment
                    inverted
                    textAlign='center'
                    className='home-header cardLoginScreen'
                    vertical
                >
                    <Container>
                        <Responsive minWidth={769}>
                            <Header />
                            <img id="logo" alt="logo" src={Logo}></img>
                        </Responsive>
                    </Container>
                </Segment>
                <div className="course-tour">
                    <Container style={{padding: '2em 0em'}}>
                        <Header as="h4" style={{color: '#005d7bc7'}} content="The Ganttesque Management"/>
                        <p style={{color: 'gray'}} >Since 2018</p>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Page;
