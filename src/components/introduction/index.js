import React from "react"
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';

import styles from "./styles";

const slides = [
  {
    num: 1,
    img: "https://i.imgur.com/78KHHjw.jpg",
    text: [
      "President Trump has won reelection and surprised the nation with the choice of a surprise running mate: Barack Obama.",
      "The two meet in the Oval Office to discuss the threat that brought them together."
    ]
  }
]



const Introduction = ({ showIntro, startIntro }) =>
  <div style={styles.background}>
    <div style={showIntro ? styles.hide : styles.btnContainer}>
      <IntroButton startIntro={startIntro} />
    </div>

    <div style={styles.slides}>
      {slides.map(slide => (
        <Slide key={slide.num} {...slide} />
      ))}
    </div>
  </div>

const IntroButton = ({ startIntro }) =>
  <Button variant="contained" size="large" onTouchStart={startIntro}>
    Play Intro
  </Button>

const Slide = ({ img, text }) =>
  <div>
    <div style={styles.sceneContainer}>
      <img src={img} style={styles.scene} />
    </div>

    <div className="sceneText" style={styles.text}>
      {text.map((t, i) => (
        <p key={i}>{t}</p>
      ))}
    </div>
  </div>

export default connect(
  state => ({ showIntro: state.get('showIntro') }),
  dispatch => ({ startIntro: event => dispatch({ type: "SHOW_INTRO" }) })
)(Introduction);
