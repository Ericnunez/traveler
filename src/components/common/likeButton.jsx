import React from "react";
import { motion } from "framer-motion";

const LikeButton = (props) => {
  // TODO: if status = true then set a class to change an icon
  // const colorFill = props.status ? "#FF0000" : "white";
  // const enabled = { scale: 1.2 };

  const styles = {
    background: "#FFF0F5",
    borderRadius: 50,
    padding: "7px 7px",
    margin: "auto",
    color: "#FF0000",
    outline: "none",
    border: "none",
    cursor: "pointer",
  };

  return (
    <motion.div>
      {props.enabled ? (
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          style={styles}
          onClick={(event) => {
            props.handleClick(event.currentTarget);
          }}
        >
          <i className="fas fa-heart fa-lg"></i>
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 1 }}
          style={styles}
          disabled="true"
          onClick={(event) => {
            props.handleClick(event.currentTarget);
          }}
        >
          <i className="far fa-heart fa-lg"></i>
        </motion.button>
      )}
    </motion.div>
  );
};

export default LikeButton;

{
  /* <motion.i
  onTap={{ y: 1 }}
  whileTap={{ scale: 0.9, x: "-5px", y: "5px", opacity: 1 }}
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ y: 1 }}
  className="fa fa-heart fa-lg"
></motion.i>; */
}
