import React, { Component } from "react";

import MovieList from "./MovieList";
import TableHeader from "../shared/TableHeader";

class MoviesTables extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" },
  ];
  render() {
    const { movies, handleRemove, handleLike, sortColumn, onSort } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <tbody>
          {movies.map((movie) => (
            <MovieList
              key={movie._id}
              id={movie._id}
              title={movie.title}
              genre={movie.genre.name}
              stock={movie.numberInStock}
              rate={movie.dailyRentalRate}
              onPress={handleRemove}
              handleLike={handleLike}
              movie={movie}
            />
          ))}
        </tbody>
      </table>
    );
  }

  sort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
}

export default MoviesTables;
