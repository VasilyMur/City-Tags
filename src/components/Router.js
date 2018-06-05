import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import City from './City';
import NotFound from './NotFound';

const Router = () => {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route path="/cities/:cityId" component={City}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        )
}

export default Router;