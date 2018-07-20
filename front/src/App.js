import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navigation from './common/navigation';
import Footer from './common/mainFooter';
//import injectTapEventPlugin from 'react-tap-event-plugin';
//import logo from './logo.svg';
import './App.css';

//injectTapEventPlugin();

class App extends Component {

    constructor(props) {
        super(props);
        /*this.state = {
            loginPage:[],
            projectPage: []
        };*/
    }

    /*componentWillMount(){
        let loginPage = [];
        loginPage.push(<LoginScreen parentContext={this}/>);
        this.setState({
            loginPage:loginPage
        })
    }*/

    render() {
        return (
            <div className="App">
                <Navigation/>
                <main className="fadeIn animated">
                    {this.props.children}
                </main>*/
                {/*{this.state.loginPage}
                {this.state.projectPage}*/}
            </div>
        );
    }
}

const style = {
    margin: 5,
};

//export default App;

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(App);