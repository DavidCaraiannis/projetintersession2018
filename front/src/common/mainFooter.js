import React, { Component } from 'react';
import {
    Grid,
    Header,
} from 'semantic-ui-react';
import { Container } from 'mdbreact';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer">
                <Container>
                    <Grid columns="equal" verticalAlign="middle" className="foobar" stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h5" inverted>Sample footer @ 2017</Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Footer;