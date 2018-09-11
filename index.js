import React from "react";
import { render } from "react-dom";
import { App } from "./src/app";
import { initializeMaterialUI, initializeAnalytics } from "./src/initializers";
import OfflinePluginRuntime from "offline-plugin/runtime";

OfflinePluginRuntime.install();
initializeMaterialUI();
initializeAnalytics();

document.body.addEventListener("touchstart", e => e.preventDefault(), { passive: false });
document.body.addEventListener("touchmove", e => e.preventDefault(), { passive: false });

const container = document.getElementById("container");
const ratio = window.devicePixelRatio;
const width = ratio * container.clientWidth;
const height = ratio * container.clientHeight;

render(<App width={width} height={height} ratio={ratio} />, container);

if (module.hot) { module.hot.accept(); }
