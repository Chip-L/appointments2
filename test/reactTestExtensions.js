import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";

export let container;

export const initializeReactContainer = () => {
  container = document.createElement("div");
  document.body.replaceChildren(container);
};

export const render = (component) =>
  act(() => ReactDOM.createRoot(container).render(component));

export const click = (element) => act(() => element.click());

export const element = (selector) => document.querySelector(selector);

export const elements = (selector) =>
  Array.from(document.querySelectorAll(selector));

export const typesOf = (elements) => elements.map((el) => el.type);

export const textOf = (elements) => elements.map((el) => el.textContent);

export const form = (id) => element("form");
