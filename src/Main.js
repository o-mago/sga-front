import React, { useState } from 'react';
import App from './App';
import Update from './Update';
import Documentation from './Documentation';
import * as serviceWorker from './serviceWorker';
import './web.config';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from './components/Login'
import AuthContext from './context/Auth'

const baseUrl = process.env.PUBLIC_URL;

function Main(props) {
    const [authTokens, setAuthTokens] = useState(sessionStorage.getItem('tokens'));
  
    const setTokens = (data) => {
      sessionStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
    //   console.log("teste", data);
    }

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <BrowserRouter>
                <Switch>
                    <Route path={baseUrl+"/"} exact={true} component={App} />
                    {/* <Route path={baseUrl+"/login"} exact={true} component={Login} /> */}
                    <PrivateRoute path={baseUrl+"/update/:year"} exact={true} component={Update} />
                    <Route path={baseUrl+"/doc"} exact={true} component={Documentation} />
                </Switch>
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

export default Main;