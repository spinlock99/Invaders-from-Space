import React from "react";
import { connect } from "react-redux";

export default connect(
  state => ({ score: state.score })
)(props =>
  <div style={{
    position: "absolute",
    top: "5px",
    right: "50px",
    color: "#FF7F00",
    fontFamily: "Helvetica, sans-serif",
    cursor: "default",
  }}>SCORE: {props.score}</div>
)
