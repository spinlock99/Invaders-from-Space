import React from "react"
import styles from "./styles"
import Button from '@material-ui/core/Button';

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

const Introduction = props =>
  <div style={styles.background}>
    <div style={styles.btnContainer}>
      <StartIntro />
    </div>

    <div style={styles.slides}>
      {slides.map(slide => (
        <Slide key={slide.num} {...slide} />
      ))}
    </div>
  </div>

const StartIntro = () =>
  <Button variant="contained" size="large">
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

export default Introduction

