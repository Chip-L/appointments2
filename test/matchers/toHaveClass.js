import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toHaveClass = (received, expectedClass) => {
  const classNames = received.className.split(" ").filter((c) => c !== "");

  const pass = classNames.includes(expectedClass);
  const sourceHint = () =>
    matcherHint("toHaveClass", "element", printExpected(expectedClass), {
      isNot: pass,
    });
  const actualClassHint = () => `Actual classes: ${printReceived(classNames)}`;
  const message = () => [sourceHint(), actualClassHint()].join("\n\n");

  return { pass, message };
};
