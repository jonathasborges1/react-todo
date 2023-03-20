
import React from "react";
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import ROUTES from "@config/routes";

import Home from "@pages/home";
import Todo from "@pages/todo";

const Routes: React.FC = ({ ...props}) => {
    return(
        <BrowserRouter> 
            <Switch>
                <Route exact path={ROUTES.HOME} component={Home}/>
                <Route path={ROUTES.TODO} component={Todo} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

