import React from "react"
import styles from "./styles"
import ExitToApp from "material-ui/svg-icons/action/exit-to-app";
import ContentAdd from 'material-ui/svg-icons/content/add';

const InstallInstructions = props =>
  <div style={styles.flexColumn}>
    <h1 style={styles.header}>
      Install the app to get started:
    </h1>
    <h2 style={styles.header}>
      Step 1:
    </h2>
    <div style={styles.instruction}>
      <div style={styles.imperative}>Tap</div>
      <ExitToApp style={styles.exitToApp} />
    </div>
    <p style={styles.subText}>to open the Action Menu</p>
    <h2 style={styles.header}>
      Step 2:
    </h2>
    <div style={styles.instruction}>
    <div style={styles.imperative}>Click</div>
      <AddToHomeScreen />
    </div>
    <p style={styles.subText}>to finish installing the app.</p>
  </div>

const AddToHomeScreen = props =>
  <div style={styles.addToHomeScreen}>
    <div style={styles.background}>
      <ContentAdd style={styles.contentAdd} />
    </div>
    <span style={styles.small}>Add to</span>
    <span style={styles.small}>Home Screen</span>
  </div>

export default InstallInstructions

