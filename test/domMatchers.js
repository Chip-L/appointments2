import { toBeElementWithTag } from "./matchers/toBeElementWithTag";
import { toBeInputFieldOfType } from "./matchers/toBeInputFieldOfType";
import { toContainText } from "./matchers/toContainText";
import { toHaveClass } from "./matchers/toHaveClass";

expect.extend({
  toBeElementWithTag,
  toBeInputFieldOfType,
  toContainText,
  toHaveClass,
});
