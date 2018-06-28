import React from "react";
import { connect } from "react-redux";

export default connect(
  state => ({ score: state.get('score') })
)(
  props => <div style={styles.score}>SCORE: {props.score}</div>
);

const styles = {
  score: {
    position: "absolute",
    top: "5px",
    right: "50px",
    color: "#FF7F00",
    fontFamily: "Helvetica, sans-serif",
    cursor: "default",
  },
};
