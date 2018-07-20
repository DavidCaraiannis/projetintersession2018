import {connect} from 'react-redux';
import Login from './Login';
import Register from './Register';

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.Auth.isAuthenticated,
    }
};

export default connect(mapStateToProps)(Login) && connect(mapStateToProps(Register))