import React from "react";
import { render } from "react-dom";
import { App } from "./src/app";
import { initializeMaterialUI, initializeServiceWorker } from "./src/initializers";
import OfflinePluginRuntime from "offline-plugin/runtime";

OfflinePluginRuntime.install();
initializeMaterialUI();

document.body.addEventListener("touchstart", e => e.preventDefault(), { passive: false });
document.body.addEventListener("touchmove", e => e.preventDefault(), { passive: false });

render(<App />, document.getElementById("container"));

if (module.hot) { module.hot.accept(); }
