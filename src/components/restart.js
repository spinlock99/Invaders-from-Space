import React from "react";
import { connect } from "react-redux";

export default connect(
  state => ({ gameOver: state.get('gameOver') }),
  dispatch => ({ restart: event => dispatch({ type: "RESTART" }) })

)(props => props.gameOver &&
  <div style={styles.container}>
    <div style={styles.score} onTouchStart={event => props.restart() && props.onTouchStart()}>RESTART</div>
  </div>
);

const styles = {
  container: {
    position: "absolute",
    top: "60%",
    left: "50%",
    color: "#FF7F00",
    fontFamily: "Helvetica, sans-serif",
    cursor: "default",
  },
  score: {
    position: "relative",
    top: "-50%",
    left: "-50%",
    fontSize: "16px",
  },
};
