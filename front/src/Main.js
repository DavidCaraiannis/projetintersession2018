import React, { Component } from 'react';
import {connect} from 'react-redux';
import Navigation from './common/navigation';
import Footer from './common/mainFooter';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navigation/>
                <main className="fadeIn animated viewglobal">
                    {this.props.children}
                </main>
                <Footer/>
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
