import React, { Component } from 'react';
import {
    Header,
    Segment,
} from 'semantic-ui-react';
import PageHeader from '../../common/pageHeader';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <PageHeader heading="Dashboard"/>
                <Segment vertical style={{minHeight: '100vh'}}>
                    <Header as='h1'>Dashboard</Header>
                </Segment>
            </div>
        );
    }
}

export default Page;