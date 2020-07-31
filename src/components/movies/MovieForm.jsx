import React from "react";
import { getGenres } from "../../services/fakeGenreService";
import { saveMovie } from "../../services/fakeMovieService";

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
    this.setState({ genres: getGenres() });
  }

  doSubmit = () => {
    const { data } = this.state;

    const movie = { ...data };
    console.log(movie);
    saveMovie(movie);

    this.props.history.push("/movies");
  };

  render() {
    const { genres, data } = this.state;
    console.log(data.genres);
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
