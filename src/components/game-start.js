import React from "react";
import { connect } from "react-redux";

export default connect(
  state => ({ gameStart: state.get('gameStart') })
)(props => props.gameStart &&
  <div style={styles.container}>
    <div style={styles.score}>GAME ON</div>
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
  score: {
    position: "relative",
    top: "-50%",
    left: "-50%",
    fontSize: "20px",
  },
};
