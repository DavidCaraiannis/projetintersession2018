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
            <div className="footer fixed-bottom">
                <Container>
                    <Grid columns="equal" verticalAlign="middle" className="foobar" stackable>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h5" inverted>Debecaan @ 2018</Header>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default Footer;