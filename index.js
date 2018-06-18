import React from "react";
import { render } from "react-dom";
import { App } from "./src/app";
import { initializeMaterialUI, initializeServiceWorker } from "./src/initializers";
import OfflinePluginRuntime from "offline-plugin/runtime";

OfflinePluginRuntime.install();
initializeMaterialUI();

render(<App />, document.getElementById("container"));

if (module.hot) { module.hot.accept(); }
