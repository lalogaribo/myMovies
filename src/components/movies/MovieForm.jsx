import React from "react";
import { getGenres } from "../../services/fakeGenreService";
import { saveMovie, getMovie } from "../../services/fakeMovieService";

import Form from "../shared/Form";
import Joi from "joi-browser";

class MovieDetail extends Form {
  state = {
    genres: [],
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genre: "",
    },
    errors: {},
  };

  loginSchema = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().label("Genre"),
    numberInStock: Joi.number().required().min(1).label("Number in Stock"),
    dailyRentalRate: Joi.number().min(1).max(10).label("Rate"),
  };

  componentDidMount() {
    const { match, history } = this.props;
    this.setState({ genres: getGenres() });

    if (match.params.id) {
      const movie = getMovie(match.params.id);
      if (!movie) return history.replace("/not-found");

      this.setState({ data: movie });
    }
  }

  doSubmit = () => {
    const { data } = this.state;
    const movie = { ...data };
    saveMovie(movie);

    this.props.history.push("/movies");
  };

  render() {
    const { genres } = this.state;
    return (
      <div>
        <h1>Movie Form </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropdown("genre", "Genres", genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.submitButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieDetail;
