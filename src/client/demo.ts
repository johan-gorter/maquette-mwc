import "@material/mwc-button";

import { createProjector, h } from "maquette";

let projector = createProjector();

let toggle = false;
function render() {
  return h("div", [
    h(
      "mwc-button",
      {
        raised: true,
        onclick: () => {
          toggle = !toggle;
        },
      },
      ["Click me"]
    ),
    toggle ? h("p", ["On"]) : h("p", ["Off"]),
  ]);
}

window.addEventListener("load", () => {
  projector.replace(document.body, render);
});
