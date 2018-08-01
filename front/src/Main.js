import React, { Component } from 'react';
import {connect} from 'react-redux';
import Navigation from './common/navigation';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navigation/>
                <main className="fadeIn animated">
                    {this.props.children}
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(Main);
