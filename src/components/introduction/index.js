import React from "react"
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import slides from "./slides";

import styles from "./styles";

const Introduction = ({ introSlide, nextSlide, prevSlide }) =>
  <div style={styles.background}>
    {introSlide == 0 ?
      <div style={styles.btnContainer}>
        <IntroButton startIntro={nextSlide} />
        {introSlide}
      </div>
      :
      <div style={styles.slide}>
        <Slide {...slides[introSlide - 1]} introSlide={introSlide} nextSlide={nextSlide} prevSlide={prevSlide} />
      </div>
    }
  </div>

const IntroButton = ({ startIntro }) =>
  <Button variant="contained" size="large" onTouchStart={startIntro}>
    Play Intro
  </Button>

const Slide = ({ img, text, introSlide, nextSlide, prevSlide }) =>
  <div>
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

    <div style={styles.nav}>
      {introSlide > 1 &&
        <span style={styles.prev} onTouchStart={prevSlide}>
          {"<"}
        </span>
      }

      {introSlide < slides.length &&
        <span style={styles.next} onTouchStart={nextSlide}>
          {">"}
        </span>
      }
    </div>
  </div>

export default connect(
  state => ({ introSlide: state.get('introSlide') }),
  dispatch => ({
    nextSlide: event => dispatch({ type: "NEXT_SLIDE" }),
    prevSlide: event => dispatch({ type: "PREV_SLIDE" })
  }),
)(Introduction);