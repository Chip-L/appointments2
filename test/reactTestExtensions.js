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

export const submit = (formElement) => {
  const event = new Event("submit", {
    bubbles: true,
    cancelable: true,
  });

  act(() => formElement.dispatchEvent(event));
  return event;
};

export const element = (selector) => document.querySelector(selector);

export const elements = (selector) =>
  Array.from(document.querySelectorAll(selector));

export const typesOf = (elements) => elements.map((el) => el.type);

export const textOf = (elements) => elements.map((el) => el.textContent);

export const form = (id) => element("form");

export const field = (fieldName) => form().elements[fieldName];

export const submitButton = () => element("input[type=submit]");
