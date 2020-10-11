import React from "react";
import { motion } from "framer-motion";

const LikeButton = (props) => {
  // TODO: if status = true then set a class to change an icon
  // const colorFill = props.status ? "#FF0000" : "white";

  const styles = {
    background: "#FFF0F5",
    borderRadius: 50,
    // width: 75,
    padding: "7px 7px",
    margin: "auto",
    color: "#FF0000",
    outline: "none",
    border: "none",
    cursor: "pointer",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
      style={styles}
      onClick={(event) => {
        props.handleClick(event.currentTarget);
      }}
    >
      <i className="fa fa-heart fa-lg"></i>
    </motion.button>
  );
};

export default LikeButton;
