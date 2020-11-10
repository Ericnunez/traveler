import React from "react";

const LikeCounter = ({ likes }) => {
  const plural = likes === 1 ? "Like" : "Likes";
  return (
    <h4>
      <span className="badge badge-pill badge-primary mr-2">
        {likes} {plural}
      </span>
    </h4>
  );
};

export default LikeCounter;
