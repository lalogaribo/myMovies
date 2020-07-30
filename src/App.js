import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

import Movies from "./components/movies/movies";
import Navbar from "./components/Navbar";
import NotFound from "./components/shared/NotFound";
import Rentals from "./components/Rentals";
import Customers from "./components/Customers";
import MovieDetail from "./components/movies/MovieDetail";

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/not-found" component={NotFound} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/movies/:id" component={MovieDetail} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/customers" component={Customers} />
          <Route path="/" exact component={Movies} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
