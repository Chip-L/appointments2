import { toBeElementWithTag } from "./matchers/toBeElementWithTag";
import { toBeInputFieldOfType } from "./matchers/toBeInputFieldOfType";
import { toBeRendered } from "./matchers/toBeRendered";
import {
  toBeRenderedWithProps,
  toBeRenderedFirstWithProps,
} from "./matchers/toBeRenderedWithProps";
import { toContainText } from "./matchers/toContainText";
import { toHaveClass } from "./matchers/toHaveClass";

expect.extend({
  toBeElementWithTag,
  toBeInputFieldOfType,
  toBeRendered,
  toBeRenderedFirstWithProps,
  toBeRenderedWithProps,
  toContainText,
  toHaveClass,
});
