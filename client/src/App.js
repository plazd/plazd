import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./component/auth/signup";
import SignIn from "./component/auth/signin";
import Home from "./component/frontpage";
// Redux
import { Provider } from 'react-redux';
import store from './store';
import DashBoard from './component/dashboard/dashboard'
import Alert from "./component/elements/Alert";
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import PrivateRoute from './component/routing/PrivateRoute'

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }, []);

  return (
    <Provider store = {store}>
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        {/* <Alert/> */}
        <section>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/dashboard" component={DashBoard} />
          </Switch>  
        </section>
      </div>
    </Router>
    </Provider>
    
  );
}

export default App;