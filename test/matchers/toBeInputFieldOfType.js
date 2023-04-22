import { matcherHint, printExpected } from "jest-matcher-utils";

export const toBeInputFieldOfType = (element, expectedType) => {
  const pass = element?.tagName === "INPUT" && element.type === expectedType;

  const sourceHint = () =>
    matcherHint(
      "toBeInputFieldOfType",
      "element",
      printExpected(expectedType),
      {
        isNot: pass,
      }
    );

  const actualHintText = () => {
    if (element === null) {
      return "element was not found";
    }
    if (element.tagName !== "INPUT") {
      return `<${element.tagName.toLowerCase()}>`;
    }
    if (element.type !== expectedType) {
      return `<${element.tagName.toLowerCase()} type=${element.type}>`;
    }
  };
  const actualTypeHint = () => `Actual: ${actualHintText()}`;
  const message = () => [sourceHint(), actualTypeHint()].join("/n/n");

  return { pass, message };
};
