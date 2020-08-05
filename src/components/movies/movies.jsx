import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import { paginate } from "../../utils/paginate";
import Pagination from "../shared/Pagination";
import Filter from "../shared/Filter";
import MoviesTables from "./MoviesTables";
import Input from "../shared/Input";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
    search: "",
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
      search,
    } = this.state;

    if (movies.length === 0) return <h3>No movies in database</h3>;

    let filteredMovies = movies;
    if (search) {
      filteredMovies = movies.filter((m) =>
        m.title.toLowerCase().startsWith(search.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filteredMovies = movies.filter((m) => m.genre._id === selectedGenre._id);
    }
    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const paginatedMovies = paginate(sorted, currentPage, pageSize);

    return <div>{this.renderTable(paginatedMovies, filteredMovies)}</div>;
  }

  renderTable = (paginatedMovies, filteredMovies) => {
    const {
      movies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      search,
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
          <Link className="btn btn-primary" to="/movies/new">
            New Movie
          </Link>
          {
            <Input
              name="search"
              placeholder="Search"
              onChange={this.handleSearch}
              value={search}
            />
          }
          {<h4>Showing {filteredMovies.length} movies in the database.</h4>}
          <MoviesTables
            currentPage={currentPage}
            movies={paginatedMovies}
            sortColumn={sortColumn}
            handleRemove={this.handleRemove}
            handleLike={this.handleLike}
            pageSize={pageSize}
            handlePage={this.handlePage}
            onSort={this.handleSort}
            handleCreateMovie={this.handleCreateMovie}
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

  handleSearch = (e) => {
    this.setState({
      search: e.currentTarget.value,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  handleCreateMovie = (movie) => {
    const newMovies = [...this.state.movies];
    this.setState({ movies: newMovies });
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
