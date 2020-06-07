import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alertmui from './alertmui';
import Grid from '@material-ui/core/Grid';

const Alert = ({alerts}) => alerts != null && alerts.map(alert =>(
    <Grid
      direction="column"
      spacing={3}
    >
        <Grid item>
                <div key={alert.id} >
                    <Alertmui alerttype={alert.alertType} alertmsg={alert.msg}/>
                </div>
        </Grid>
    </Grid>
    
    
))

Alert.PropTypes = {
    alerts:PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);

// /className={' alert alert-${alert.alertType}'}