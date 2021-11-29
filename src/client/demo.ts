import "@material/mwc-button";
import "@material/mwc-icon-button";
import "@material/mwc-top-app-bar-fixed";
import "@material/mwc-drawer";
import "@material/mwc-select";

import { createProjector, h } from "maquette";

let projector = createProjector();

let toggle = false;
let drawerOpen = false;
let selectedValue = "2";

setInterval(() => {
  toggle = !toggle;
  projector.scheduleRender();
}, 2000);

function render() {
  return h("body", [
    drawerOpen ? renderDrawer() : undefined,
    h("mwc-top-app-bar-fixed", [
      h("mwc-icon-button", {
        icon: "menu",
        slot: "navigationIcon",
        onclick: () => {
          drawerOpen = !drawerOpen;
        },
      }),
      h("div", { slot: "title" }, ["Title"]),
      h("mwc-icon-button", { icon: "favorite", slot: "actionItems" }),
      h("main", [
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
        h(
          "mwc-select",
          {
            outlined: "",
            label: "Select value",
            value: selectedValue,
            onchange(ev: Event): boolean | void {
              selectedValue = (ev.currentTarget as HTMLInputElement).value;
            },
          },
          [
            h("mwc-list-item", { value: "1" }, ["Optie 1"]),
            h("mwc-list-item", { value: "2" }, ["Optie 2"]),
            toggle ? h("mwc-list-item", { value: "3", key: 1 }, ["Optie 3"]) : undefined,
          ]
        ),
        h(
          "mwc-select",
          {
            outlined: "",
            label: "Select value",
            value: selectedValue,
            onchange(ev: Event): boolean | void {
              selectedValue = (ev.currentTarget as HTMLInputElement).value;
            },
          },
          [
            h("mwc-list-item", { value: "1" }, ["Optie 1"]),
            h("mwc-list-item", { value: "2" }, ["Optie 2"]),
            toggle ? h("mwc-list-item", { value: "3", key: 1 }, ["Optie 3"]) : undefined,
          ]
        ),
      ]),
    ]),
  ]);
}

function renderDrawer() {
  return h("mwc-drawer", { type: "modal", afterCreate: afterDrawerCreate }, [h("div", [h("p", ["Drawer content"])])]);
}

function afterDrawerCreate(el: HTMLElement) {
  setTimeout(() => el.setAttribute("open", "true"));
  el.addEventListener("MDCDrawer:closed", () => {
    drawerOpen = false;
    projector.scheduleRender();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
  projector.merge(document.body, render);
});
