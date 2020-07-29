import React from "react";

const Like = ({ liked, handleLike, movie }) => {
  const setClass = () => {
    return liked ? "fa fa-heart" : "fa fa-heart-o";
  };
  return (
    <i
      className={setClass()}
      style={{ cursor: "pointer" }}
      onClick={() => handleLike(movie)}
    />
  );
};

export default Like;
