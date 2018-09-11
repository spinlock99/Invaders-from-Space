import React from "react";
import { connect } from "react-redux";

export default connect(
  state => ({ gameStart: state.get('gameStart') })
)(props => props.gameStart &&
  <div style={styles.container}>
    <div style={styles.score}>
      DRAG SHIP TO START
      <img style={styles.image} src={ require("images/spaceship.png") } />
    </div>
  </div>
);

const styles = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    color: "#FF7F00",
    fontFamily: "Helvetica, sans-serif",
    cursor: "default",
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "25px"
  },
  score: {
    position: "relative",
    textAlign: "center",
    top: "-50%",
    left: "-50%",
    fontSize: "20px",
  },
};
