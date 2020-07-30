import React from "react";

const MovieDetail = ({ match, history }) => {
  return (
    <div>
      <h3>Movie detail - {match.params.id} </h3>
      <button
        className="btn btn-primary btn-small"
        onClick={() => history.replace("/")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieDetail;
