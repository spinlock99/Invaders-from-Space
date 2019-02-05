import React from "react"
import { connect } from "react-redux";
import InstallInstructions from "../install-instructions";
import Button from '@material-ui/core/Button';
import slides from "./slides";

import styles from "./styles";

const Introduction = ({ currentSlide, nextSlide, prevSlide, installInstructions, showInstallInstruction }) =>
  <div style={styles.background}>
    {installInstructions ? <InstallInstructions />
      :
      currentSlide == 0 ?
        <div style={styles.btnContainer}>
          <IntroButton startIntro={nextSlide} />
          {currentSlide}
        </div>
        :
        <div style={styles.slide}>
          <Slide {...slides[currentSlide - 1]} currentSlide={currentSlide} nextSlide={nextSlide} prevSlide={prevSlide} showInstallInstruction={showInstallInstruction} />
        </div>
    }
  </div>

const IntroButton = ({ startIntro }) =>
  <Button variant="contained" size="large" onTouchStart={startIntro}>
    Play Intro
  </Button>

const Slide = ({ img, text, currentSlide, nextSlide, prevSlide, showInstallInstruction }) =>
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
      {currentSlide > 1 &&
        <span style={styles.prev} onTouchStart={prevSlide}>
          {"<"}
        </span>
      }

      {currentSlide < slides.length &&
        <span style={styles.next} onTouchStart={nextSlide}>
          {">"}
        </span>
      }

      {currentSlide >= slides.length &&
        <span style={styles.next} onTouchStart={showInstallInstruction}>
          {">"}
        </span>
      }
    </div>
  </div>

export default connect(
  state => ({
    currentSlide: state.get('currentSlide'),
    installInstructions: state.get('showInstallInstructions')
  }),
  dispatch => ({
    nextSlide: event => dispatch({ type: "NEXT_SLIDE" }),
    prevSlide: event => dispatch({ type: "PREV_SLIDE" }),
    showInstallInstruction: event => dispatch({ type: "SHOW_INSTALL_INSTRUCTIONS" })
  }),
)(Introduction);