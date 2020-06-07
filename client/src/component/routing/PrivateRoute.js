import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
  }) => (
    <Route
      {...rest}
      render={props =>
        loading ? (
          <CircularProgress />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);