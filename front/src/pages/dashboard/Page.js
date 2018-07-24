import React, { Component } from 'react';
import {
    Header,
    Segment,
} from 'semantic-ui-react';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Segment vertical style={{minHeight: '100vh'}}>
                    <Header as='h1'>Dashboard</Header>
                </Segment>
            </div>
        );
    }
}

export default Page;