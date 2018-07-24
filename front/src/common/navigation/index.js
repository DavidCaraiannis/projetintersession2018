// import libs
import {connect} from 'react-redux'

// import component
import Page from './Page'

const mapStateToProps = state => {
    return {
        isAuthenticated : state.Auth.isAuthenticated,
        userEmail : state.Auth.user.email,
    }
};

export default connect(mapStateToProps)(Page)