import { toBeElementWithTag } from "./matchers/toBeElementWithTag";
import { toBeInputFieldOfType } from "./matchers/toBeInputFieldOfType";
import {
  toBeRenderedWithProps,
  toBeRenderedFirstWithProps,
} from "./matchers/toBeRenderedWithProps";
import { toContainText } from "./matchers/toContainText";
import { toHaveClass } from "./matchers/toHaveClass";

expect.extend({
  toBeElementWithTag,
  toBeInputFieldOfType,
  toBeRenderedFirstWithProps,
  toBeRenderedWithProps,
  toContainText,
  toHaveClass,
});
