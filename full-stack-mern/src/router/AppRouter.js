import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FirstStep from '../components/FirstStep.js';
import Header from '../components/Header.js';

const AppRouter = () => {


    return (
        <BrowserRouter>
            <div className="container">
                <Header />
                <Switch>
                    <Route component={FirstStep} path="/" exact={true} />
                </Switch>
            </div>
        </BrowserRouter>

    );  
};

export default AppRouter;