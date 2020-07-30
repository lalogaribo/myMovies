import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const styles = {
    active: {
      fontWeight: "bold",
      color: "grey",
      textDecoration: "none",
    },
    link: {
      textDecoration: "none",
      color: "black",
    },
  };
  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        MyMovies
      </Link>
      <div className="collapse navbar-collapse">
        <NavLink
          to="/movies"
          activeStyle={styles.active}
          className="nav-item nav-link"
        >
          Movies
        </NavLink>
        <NavLink
          to="/customers"
          activeStyle={styles.active}
          className="nav-item nav-link"
        >
          {" "}
          Customers
        </NavLink>
        <NavLink
          to="/rentals"
          activeStyle={styles.active}
          className="nav-item nav-link"
        >
          Rentals
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
