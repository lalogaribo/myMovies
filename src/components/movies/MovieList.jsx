import React from "react";
import Like from "../shared/Like";

const MovieList = ({
  title,
  genre,
  stock,
  rate,
  onPress,
  id,
  handleLike,
  movie,
}) => {
  return (
    <>
      <tr>
        <td>{title}</td>
        <td>{genre}</td>
        <td>{stock}</td>
        <td>{rate}</td>
        <td>
          <Like liked={movie.liked} handleLike={handleLike} movie={movie} />
        </td>
        <td>
          <button
            className="btn btn-danger btn-small"
            onClick={() => onPress(id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default MovieList;
