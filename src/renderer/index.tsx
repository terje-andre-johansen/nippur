import * as React from "react";
import * as ReactDOM from "react-dom";

import PageWithScene from "../components/PageWithScene/PageWithScene";

function init() {
  ReactDOM.render(
    <PageWithScene></PageWithScene>,

    document.getElementById("app")
  );
}

init();
