import React, { Component } from "react";
import _ from "lodash";
import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import { paginate } from "../../utils/paginate";
import Pagination from "../shared/Pagination";
import Filter from "../shared/Filter";
import MoviesTables from "./MoviesTables";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  render() {
    const {
      movies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
    } = this.state;

    if (movies.length === 0) return <h3>No movies in database</h3>;

    const filteredMovies = selectedGenre
      ? movies.filter((movie) => movie.genre.name === selectedGenre)
      : movies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const paginatedMovies = paginate(sorted, currentPage, pageSize);

    return (
      <div style={{ textAlign: "center" }}>
        {<h4>Showing {filteredMovies.length} movies in the database.</h4>}
        {this.renderTable(paginatedMovies)}
      </div>
    );
  }

  renderTable = (paginatedMovies) => {
    const {
      movies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;
    return (
      <div className="row">
        <div className="col-md-2">
          <Filter
            items={genres}
            onSelectItem={this.handleGenreSelect}
            title="All Genres"
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col-md-10">
          <MoviesTables
            currentPage={currentPage}
            movies={paginatedMovies}
            sortColumn={sortColumn}
            handleRemove={this.handleRemove}
            handleLike={this.handleLike}
            pageSize={pageSize}
            handlePage={this.handlePage}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={movies.length}
            pageSize={pageSize}
            onPageChange={this.handlePage}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleLike = (movie) => {
    console.log(movie);
  };
  handleRemove = (id) => {
    const { movies } = this.state;
    let newMovies = movies.filter((movie) => movie._id !== id);
    this.setState({ movies: newMovies });
  };
  handlePage = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
}

export default Movies;
