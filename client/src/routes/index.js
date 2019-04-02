import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Landing from "./landing";
import LoginPage from "./login";
import RegisterPage from "./register";
import RecoverPage from "./recover";
import InstructorResults from "./instructor-results";
import InstructorRegister from "./instructor-register";
import PublicProfile from "./public-profile";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="/register" exact component={RegisterPage} />
      <Route path="/profile" exact component={InstructorRegister} />
      <Route path="/profile/id" exact component={PublicProfile} />
      <Route path="/recover" exact component={RecoverPage} />
      <Route path="/search" exact component={InstructorResults} />
    </Switch>
  </BrowserRouter>
);
