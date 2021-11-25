import "@material/mwc-button";
import "@material/mwc-icon-button";
import "@material/mwc-top-app-bar-fixed";
import "@material/mwc-drawer";

import { createProjector, h } from "maquette";

let projector = createProjector();

let toggle = false;
let drawerOpen = true;

function render() {
  return h("mwc-top-app-bar-fixed", [
    renderDrawer(),
    h("mwc-icon-button", {
      icon: "menu",
      slot: "navigationIcon",
      onclick: () => {
        drawerOpen = !drawerOpen;
      },
    }),
    h("div", { slot: "title" }, ["Title"]),
    h("mwc-icon-button", { icon: "favorite", slot: "actionItems" }),
    h("div", [
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
    ]),
  ]);
}

function renderDrawer() {
  return h("mwc-drawer", { type: "modal", open: drawerOpen, afterCreate: afterDrawerCreate }, [
    h("div", [h("p", ["Drawer content"])]),
  ]);
}

function afterDrawerCreate(el: HTMLElement) {
  el.addEventListener("MDCDrawer:closed", () => {
    alert("closed");
  });
  el.addEventListener("MDCDrawer:opened", () => {
    alert("opened");
  });
}

window.addEventListener("load", () => {
  projector.replace(document.body, renderDrawer);
});
