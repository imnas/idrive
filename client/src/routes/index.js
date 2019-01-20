import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "./landing";
import LoginPage from "./login";
import RegisterPage from "./register";
import RecoverPage from "./recover";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/signup" exact component={RegisterPage} />
      <Route path="/recover" exact component={RecoverPage} />
    </Switch>
  </BrowserRouter>
);
