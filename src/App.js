import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Movies from "./components/movies/movies";
import Navbar from "./components/Navbar";
import NotFound from "./components/shared/NotFound";
import Rentals from "./components/Rentals";
import Customers from "./components/Customers";
import MovieForm from "./components/movies/MovieForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/customers" component={Customers} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/movies/new" component={MovieForm} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
