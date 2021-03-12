import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FirstStep from '../components/FirstStep.js';
import Header from '../components/Header.js';
import SecondStep from '../components/SecondStep.js';

const AppRouter = () => (


    
        <BrowserRouter>
            <div className="container">
                <Header />
                <Switch>
                    <Route component={FirstStep} path="/" exact={true} />
                    <Route component={SecondStep} path="/second" />
                    <Route component={ThirdStep} path= "/third"/>
                </Switch>
            </div>
        </BrowserRouter>

    );  

export default AppRouter;