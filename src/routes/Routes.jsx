import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/Home"
import Campaign from "../pages/Campaign"
import NoMatch from "../pages/NoMatch"

const Routes = () => {

     return <Router>
                <Switch>
                    <Route exact push path="/">
                        <Home />
                    </Route>
                    <Route exact push path="/campaign/:id" >
                        <Campaign />
                    </Route>
                    <Route component={NoMatch} />
                </Switch>
            </Router>
 }
 export default Routes
 